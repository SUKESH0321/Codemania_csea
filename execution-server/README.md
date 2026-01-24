# CodeMania Execution Server

Separate server for compiling and running user code submissions.

## Setup

```bash
cd execution-server
npm install
```

## Run Single Instance (Development)

```bash
npm run dev
```

## Run Multiple Instances (Production)

### Windows PowerShell:

```powershell
# Start 5 instances on different ports
$env:PORT=6001; Start-Process node -ArgumentList "server.js"
$env:PORT=6002; Start-Process node -ArgumentList "server.js"
$env:PORT=6003; Start-Process node -ArgumentList "server.js"
$env:PORT=6004; Start-Process node -ArgumentList "server.js"
$env:PORT=6005; Start-Process node -ArgumentList "server.js"
```

### Linux/Mac:

```bash
PORT=6001 node server.js &
PORT=6002 node server.js &
PORT=6003 node server.js &
PORT=6004 node server.js &
PORT=6005 node server.js &
```

## API Endpoints

### POST /execute

Execute code against test cases.

**Headers:**

```
x-execution-secret: your-secret-key
Content-Type: application/json
```

**Body:**

```json
{
  "code": "print(input())",
  "language": "python",
  "testCases": [
    {
      "input": "hello",
      "expectedOutput": "hello",
      "hidden": false
    }
  ],
  "timeLimit": 2000,
  "submissionId": "optional-tracking-id"
}
```

**Response:**

```json
{
  "verdict": "AC",
  "results": [
    {
      "testCase": 1,
      "verdict": "AC",
      "time": 45,
      "hidden": false
    }
  ],
  "totalTestCases": 1,
  "passedTestCases": 1,
  "serverTime": 120
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "port": 6001,
  "timestamp": "2026-01-24T10:00:00.000Z"
}
```

## Verdicts

| Verdict | Meaning                                     |
| ------- | ------------------------------------------- |
| AC      | Accepted - All test cases passed            |
| WA      | Wrong Answer - Output doesn't match         |
| TLE     | Time Limit Exceeded - Code took too long    |
| RE      | Runtime Error - Code crashed                |
| CE      | Compilation Error - Java compilation failed |

## Nginx Configuration (Load Balancer)

```nginx
upstream execution_servers {
    least_conn;
    server 127.0.0.1:6001;
    server 127.0.0.1:6002;
    server 127.0.0.1:6003;
    server 127.0.0.1:6004;
    server 127.0.0.1:6005;
}

server {
    listen 6000;

    location / {
        proxy_pass http://execution_servers;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_connect_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

## Security Notes

1. Always set `EXECUTION_SECRET` in production
2. Run on a separate server/VM from main backend if possible
3. Consider running as a restricted user (no sudo access)
4. The temp folder is auto-cleaned after each execution
