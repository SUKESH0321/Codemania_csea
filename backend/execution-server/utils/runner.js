const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const PYTHON_PATH = process.env.PYTHON_PATH || "python";
const JAVA_PATH = process.env.JAVA_PATH || "java";
const JAVAC_PATH = process.env.JAVAC_PATH || "javac";
const GCC_PATH = process.env.GCC_PATH || "gcc";

/**
 * Main function to run code against test cases
 */
async function runCode(code, language, testCases, timeLimit = 2000) {
  const jobId = uuidv4();
  const tempDir = path.join(__dirname, "..", "temp", jobId);

  try {
    // Create temp directory
    await fs.mkdir(tempDir, { recursive: true });

    // Write code to file
    const { filePath, className } = await writeCodeToFile(
      code,
      language,
      tempDir
    );

    // Compile if needed (Java or C)
    if (language === "java") {
      const compileResult = await compileJava(filePath, tempDir);
      if (!compileResult.success) {
        return {
          verdict: "CE",
          error: compileResult.error,
          results: [],
        };
      }
    } else if (language === "c") {
      const compileResult = await compileC(filePath, tempDir);
      if (!compileResult.success) {
        return {
          verdict: "CE",
          error: compileResult.error,
          results: [],
        };
      }
    }

    // Run against each test case
    const results = [];
    let finalVerdict = "AC";

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const result = await runTestCase(
        language,
        tempDir,
        className,
        testCase,
        timeLimit
      );

      results.push({
        testCase: i + 1,
        ...result,
        hidden: testCase.hidden || false,
      });

      // Stop on first failure (optional - can change to run all)
      if (result.verdict !== "AC") {
        finalVerdict = result.verdict;
        break;
      }
    }

    // If all passed
    if (finalVerdict === "AC") {
      finalVerdict = "AC";
    }

    return {
      verdict: finalVerdict,
      results,
      totalTestCases: testCases.length,
      passedTestCases: results.filter((r) => r.verdict === "AC").length,
    };
  } catch (error) {
    console.error("Execution error:", error);
    return {
      verdict: "RE",
      error: error.message,
      results: [],
    };
  } finally {
    // Cleanup temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error("Cleanup error:", cleanupError);
    }
  }
}

/**
 * Write code to appropriate file based on language
 */
async function writeCodeToFile(code, language, tempDir) {
  let fileName, className;

  if (language === "python") {
    fileName = "solution.py";
    className = null;
  } else if (language === "java") {
    // Extract class name from Java code
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    className = classMatch ? classMatch[1] : "Solution";
    fileName = `${className}.java`;
  } else if (language === "c") {
    fileName = "solution.c";
    className = "solution"; // Executable name
  } else {
    throw new Error(`Unsupported language: ${language}`);
  }

  const filePath = path.join(tempDir, fileName);
  await fs.writeFile(filePath, code, "utf8");

  return { filePath, className };
}

/**
 * Compile Java code
 */
async function compileJava(filePath, tempDir) {
  return new Promise((resolve) => {
    const compile = spawn(JAVAC_PATH, [filePath], {
      cwd: tempDir,
      timeout: 30000, // 30 second compile timeout
    });

    let stderr = "";

    compile.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    compile.on("close", (code) => {
      if (code === 0) {
        resolve({ success: true });
      } else {
        resolve({
          success: false,
          error: stderr || "Compilation failed",
        });
      }
    });

    compile.on("error", (err) => {
      resolve({
        success: false,
        error: `Compilation error: ${err.message}`,
      });
    });
  });
}

/**
 * Compile C code using GCC
 */
async function compileC(filePath, tempDir) {
  return new Promise((resolve) => {
    const isWindows = process.platform === "win32";
    const outputName = isWindows ? "solution.exe" : "solution";

    const compile = spawn(GCC_PATH, [filePath, "-o", outputName], {
      cwd: tempDir,
      timeout: 30000, // 30 second compile timeout
    });

    let stderr = "";

    compile.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    compile.on("close", (code) => {
      if (code === 0) {
        resolve({ success: true });
      } else {
        resolve({
          success: false,
          error: stderr || "Compilation failed",
        });
      }
    });

    compile.on("error", (err) => {
      resolve({
        success: false,
        error: `Compilation error: ${err.message}`,
      });
    });
  });
}

/**
 * Run code against a single test case
 */
async function runTestCase(language, tempDir, className, testCase, timeLimit) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let processRef;

    // Build command based on language
    if (language === "python") {
      processRef = spawn(PYTHON_PATH, ["solution.py"], {
        cwd: tempDir,
        timeout: timeLimit,
      });
    } else if (language === "java") {
      processRef = spawn(JAVA_PATH, [className], {
        cwd: tempDir,
        timeout: timeLimit,
      });
    } else if (language === "c") {
      // On Windows, the executable is solution.exe; on Unix, it's ./solution
      const isWindows = process.platform === "win32";
      const execName = isWindows ? "solution.exe" : "./solution";
      processRef = spawn(execName, [], {
        cwd: tempDir,
        timeout: timeLimit,
        shell: isWindows,
      });
    }

    let stdout = "";
    let stderr = "";
    let killed = false;

    // Set manual timeout as backup
    const timeoutId = setTimeout(() => {
      killed = true;
      processRef.kill("SIGKILL");
    }, timeLimit + 500);

    // Send input to stdin
    if (testCase.input) {
      processRef.stdin.write(testCase.input);
    }
    processRef.stdin.end();

    // Capture stdout
    processRef.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    // Capture stderr
    processRef.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    processRef.on("close", (code, signal) => {
      clearTimeout(timeoutId);
      const executionTime = Date.now() - startTime;

      // Check if killed due to timeout
      if (killed || signal === "SIGKILL" || signal === "SIGTERM") {
        return resolve({
          verdict: "TLE",
          time: timeLimit,
          message: "Time Limit Exceeded",
        });
      }

      // Check for runtime error
      if (code !== 0) {
        return resolve({
          verdict: "RE",
          time: executionTime,
          error: stderr || `Process exited with code ${code}`,
        });
      }

      // Compare output
      const actualOutput = normalizeOutput(stdout);
      const expectedOutput = normalizeOutput(testCase.expectedOutput);

      if (actualOutput === expectedOutput) {
        return resolve({
          verdict: "AC",
          time: executionTime,
        });
      } else {
        return resolve({
          verdict: "WA",
          time: executionTime,
          expected: testCase.hidden ? "[Hidden]" : expectedOutput,
          actual: testCase.hidden ? "[Hidden]" : actualOutput,
        });
      }
    });

    processRef.on("error", (err) => {
      clearTimeout(timeoutId);
      resolve({
        verdict: "RE",
        time: Date.now() - startTime,
        error: err.message,
      });
    });
  });
}

/**
 * Normalize output for comparison (trim whitespace, normalize line endings)
 */
function normalizeOutput(output) {
  if (!output) return "";
  return output
    .toString()
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

module.exports = { runCode };
