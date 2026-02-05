// Centralized problem data for the IDE
// Contains full problem details, examples, test cases, and starter code templates

export const PROBLEMS = {
    1: {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        category: "Arrays",
        timeLimit: "1000ms",
        memoryLimit: "256MB",
        points: 100,
        description: `Given an array of integers <code class="text-cyan-400">nums</code> and an integer <code class="text-cyan-400">target</code>, return <em>indices of the two numbers such that they add up to <code class="text-cyan-400">target</code></em>.

You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0, 1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1, 2]"
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0, 1]"
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        testCases: [
            { input: "4\n2 7 11 15\n9", expectedOutput: "0 1", hidden: false },
            { input: "3\n3 2 4\n6", expectedOutput: "1 2", hidden: false },
            { input: "2\n3 3\n6", expectedOutput: "0 1", hidden: true },
            { input: "5\n1 5 3 7 2\n8", expectedOutput: "0 3", hidden: true }
        ],
        starterCode: {
            python: `def two_sum(nums, target):
    # Write your code here
    # Return indices of two numbers that add up to target
    pass

# Read input
n = int(input())
nums = list(map(int, input().split()))
target = int(input())

# Call function and print result
result = two_sum(nums, target)
print(result[0], result[1])`,
            java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{0, 0};
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        
        int[] result = twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
            c: `#include <stdio.h>
#include <stdlib.h>

void twoSum(int* nums, int n, int target, int* result) {
    // Write your code here
    // Store indices in result[0] and result[1]
    result[0] = 0;
    result[1] = 0;
}

int main() {
    int n, target;
    scanf("%d", &n);
    
    int* nums = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &nums[i]);
    }
    scanf("%d", &target);
    
    int result[2];
    twoSum(nums, n, target, result);
    printf("%d %d\\n", result[0], result[1]);
    
    free(nums);
    return 0;
}`
        }
    },
    2: {
        id: 2,
        title: "Binary Tree Traversal",
        difficulty: "Medium",
        category: "Trees",
        timeLimit: "2000ms",
        memoryLimit: "256MB",
        points: 200,
        description: `Implement an <strong>in-order traversal</strong> of a binary tree without using recursion.

Given the root of a binary tree, return the in-order traversal of its nodes' values.

In-order traversal visits nodes in the order: <code class="text-cyan-400">left → root → right</code>.`,
        examples: [
            {
                input: "root = [1,null,2,3]",
                output: "[1, 3, 2]",
                explanation: "The tree structure: 1 → right: 2 → left: 3"
            },
            {
                input: "root = []",
                output: "[]"
            }
        ],
        constraints: [
            "The number of nodes in the tree is in the range [0, 100]",
            "-100 <= Node.val <= 100"
        ],
        testCases: [
            { input: "3\n1 -1 2\n-1 3 -1", expectedOutput: "1 3 2", hidden: false },
            { input: "0", expectedOutput: "", hidden: false },
            { input: "5\n4 2 6 1 3", expectedOutput: "1 2 3 4 6", hidden: true }
        ],
        starterCode: {
            python: `def inorder_traversal(nodes):
    # Implement iterative in-order traversal
    # Return list of values in in-order sequence
    result = []
    # Your code here
    return result

# Read input
n = int(input())
if n > 0:
    nodes = list(map(int, input().split()))
    result = inorder_traversal(nodes)
    print(' '.join(map(str, result)))
else:
    print()`,
            java: `import java.util.*;

public class Solution {
    public static List<Integer> inorderTraversal(int[] nodes) {
        List<Integer> result = new ArrayList<>();
        // Your code here - implement iterative in-order traversal
        return result;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        if (n > 0) {
            int[] nodes = new int[n];
            for (int i = 0; i < n; i++) {
                nodes[i] = sc.nextInt();
            }
            List<Integer> result = inorderTraversal(nodes);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.size(); i++) {
                if (i > 0) sb.append(" ");
                sb.append(result.get(i));
            }
            System.out.println(sb);
        } else {
            System.out.println();
        }
    }
}`,
            c: `#include <stdio.h>
#include <stdlib.h>

void inorderTraversal(int* nodes, int n, int* result, int* resultSize) {
    // Implement iterative in-order traversal
    // Store values in result array
    *resultSize = 0;
}

int main() {
    int n;
    scanf("%d", &n);
    
    if (n > 0) {
        int* nodes = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) {
            scanf("%d", &nodes[i]);
        }
        
        int* result = (int*)malloc(n * sizeof(int));
        int resultSize;
        inorderTraversal(nodes, n, result, &resultSize);
        
        for (int i = 0; i < resultSize; i++) {
            if (i > 0) printf(" ");
            printf("%d", result[i]);
        }
        printf("\\n");
        
        free(nodes);
        free(result);
    } else {
        printf("\\n");
    }
    return 0;
}`
        }
    },
    3: {
        id: 3,
        title: "DP - Knapsack",
        difficulty: "Hard",
        category: "Dynamic Prog",
        timeLimit: "3000ms",
        memoryLimit: "512MB",
        points: 300,
        description: `Solve the classic <strong>0/1 Knapsack Problem</strong> using dynamic programming.

Given <code class="text-cyan-400">n</code> items, each with a weight and value, determine the maximum value that can be obtained by selecting items with a total weight not exceeding <code class="text-cyan-400">W</code>.

Each item can be selected <strong>at most once</strong>.`,
        examples: [
            {
                input: "n = 3, W = 50, weights = [10,20,30], values = [60,100,120]",
                output: "220",
                explanation: "Select items with weights 20 and 30 for values 100 + 120 = 220"
            },
            {
                input: "n = 3, W = 10, weights = [5,4,6], values = [10,40,30]",
                output: "50"
            }
        ],
        constraints: [
            "1 <= n <= 100",
            "1 <= W <= 1000",
            "1 <= weight[i] <= W",
            "1 <= value[i] <= 1000"
        ],
        testCases: [
            { input: "3 50\n10 20 30\n60 100 120", expectedOutput: "220", hidden: false },
            { input: "3 10\n5 4 6\n10 40 30", expectedOutput: "50", hidden: false },
            { input: "4 7\n1 3 4 5\n1 4 5 7", expectedOutput: "9", hidden: true }
        ],
        starterCode: {
            python: `def knapsack(n, W, weights, values):
    # Implement 0/1 knapsack using dynamic programming
    # Return maximum value achievable
    return 0

# Read input
n, W = map(int, input().split())
weights = list(map(int, input().split()))
values = list(map(int, input().split()))

result = knapsack(n, W, weights, values)
print(result)`,
            java: `import java.util.*;

public class Solution {
    public static int knapsack(int n, int W, int[] weights, int[] values) {
        // Implement 0/1 knapsack using dynamic programming
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int W = sc.nextInt();
        
        int[] weights = new int[n];
        int[] values = new int[n];
        
        for (int i = 0; i < n; i++) weights[i] = sc.nextInt();
        for (int i = 0; i < n; i++) values[i] = sc.nextInt();
        
        int result = knapsack(n, W, weights, values);
        System.out.println(result);
    }
}`,
            c: `#include <stdio.h>
#include <stdlib.h>

int knapsack(int n, int W, int* weights, int* values) {
    // Implement 0/1 knapsack using dynamic programming
    return 0;
}

int main() {
    int n, W;
    scanf("%d %d", &n, &W);
    
    int* weights = (int*)malloc(n * sizeof(int));
    int* values = (int*)malloc(n * sizeof(int));
    
    for (int i = 0; i < n; i++) scanf("%d", &weights[i]);
    for (int i = 0; i < n; i++) scanf("%d", &values[i]);
    
    int result = knapsack(n, W, weights, values);
    printf("%d\\n", result);
    
    free(weights);
    free(values);
    return 0;
}`
        }
    },
    4: {
        id: 4,
        title: "String Palindrome",
        difficulty: "Easy",
        category: "Strings",
        timeLimit: "1000ms",
        memoryLimit: "256MB",
        points: 150,
        description: `Given a string <code class="text-cyan-400">s</code>, find the <strong>longest palindromic substring</strong> in s.

A palindrome is a string that reads the same forwards and backwards.`,
        examples: [
            {
                input: 's = "babad"',
                output: '"bab"',
                explanation: '"aba" is also a valid answer.'
            },
            {
                input: 's = "cbbd"',
                output: '"bb"'
            }
        ],
        constraints: [
            "1 <= s.length <= 1000",
            "s consist of only digits and English letters"
        ],
        testCases: [
            { input: "babad", expectedOutput: "bab", hidden: false },
            { input: "cbbd", expectedOutput: "bb", hidden: false },
            { input: "racecar", expectedOutput: "racecar", hidden: true }
        ],
        starterCode: {
            python: `def longest_palindrome(s):
    # Find and return the longest palindromic substring
    return ""

s = input().strip()
result = longest_palindrome(s)
print(result)`,
            java: `import java.util.*;

public class Solution {
    public static String longestPalindrome(String s) {
        // Find and return the longest palindromic substring
        return "";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        String result = longestPalindrome(s);
        System.out.println(result);
    }
}`,
            c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char* longestPalindrome(char* s) {
    // Find and return the longest palindromic substring
    // Caller must free the returned string
    char* result = (char*)malloc(2);
    result[0] = s[0];
    result[1] = '\\0';
    return result;
}

int main() {
    char s[1001];
    scanf("%s", s);
    
    char* result = longestPalindrome(s);
    printf("%s\\n", result);
    
    free(result);
    return 0;
}`
        }
    },
    5: {
        id: 5,
        title: "Dijkstra's Algo",
        difficulty: "Hard",
        category: "Graphs",
        timeLimit: "3000ms",
        memoryLimit: "512MB",
        points: 350,
        description: `Implement <strong>Dijkstra's shortest path algorithm</strong> for a weighted graph.

Given a directed graph with <code class="text-cyan-400">n</code> nodes and <code class="text-cyan-400">m</code> edges, find the shortest path from node <code class="text-cyan-400">1</code> to node <code class="text-cyan-400">n</code>.`,
        examples: [
            {
                input: "n = 5, edges = [[1,2,2],[1,3,4],[2,3,1],[2,4,7],[3,5,3],[4,5,1]]",
                output: "6",
                explanation: "Shortest path: 1 → 2 → 3 → 5 with cost 2 + 1 + 3 = 6"
            }
        ],
        constraints: [
            "2 <= n <= 10^5",
            "1 <= m <= 2 * 10^5",
            "1 <= weight <= 10^9"
        ],
        testCases: [
            { input: "5 6\n1 2 2\n1 3 4\n2 3 1\n2 4 7\n3 5 3\n4 5 1", expectedOutput: "6", hidden: false },
            { input: "3 2\n1 2 5\n2 3 5", expectedOutput: "10", hidden: false },
            { input: "4 4\n1 2 1\n2 3 1\n3 4 1\n1 4 10", expectedOutput: "3", hidden: true }
        ],
        starterCode: {
            python: `import heapq

def dijkstra(n, edges):
    # Implement Dijkstra's algorithm
    # Return shortest distance from node 1 to node n
    return -1

# Read input
n, m = map(int, input().split())
edges = []
for _ in range(m):
    u, v, w = map(int, input().split())
    edges.append((u, v, w))

result = dijkstra(n, edges)
print(result)`,
            java: `import java.util.*;

public class Solution {
    public static long dijkstra(int n, int[][] edges) {
        // Implement Dijkstra's algorithm
        // Return shortest distance from node 1 to node n
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        
        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = sc.nextInt();
            edges[i][1] = sc.nextInt();
            edges[i][2] = sc.nextInt();
        }
        
        long result = dijkstra(n, edges);
        System.out.println(result);
    }
}`,
            c: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

long long dijkstra(int n, int m, int edges[][3]) {
    // Implement Dijkstra's algorithm
    // Return shortest distance from node 1 to node n
    return -1;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    
    int (*edges)[3] = malloc(m * sizeof(*edges));
    for (int i = 0; i < m; i++) {
        scanf("%d %d %d", &edges[i][0], &edges[i][1], &edges[i][2]);
    }
    
    long long result = dijkstra(n, m, edges);
    printf("%lld\\n", result);
    
    free(edges);
    return 0;
}`
        }
    },
    6: {
        id: 6,
        title: "Merge Sort",
        difficulty: "Medium",
        category: "Sorting",
        timeLimit: "2000ms",
        memoryLimit: "256MB",
        points: 180,
        description: `Implement the <strong>Merge Sort</strong> algorithm to sort an array of integers in ascending order.

Merge sort is a divide-and-conquer algorithm with <code class="text-cyan-400">O(n log n)</code> time complexity.`,
        examples: [
            {
                input: "arr = [5,2,3,1]",
                output: "[1, 2, 3, 5]"
            },
            {
                input: "arr = [5,1,1,2,0,0]",
                output: "[0, 0, 1, 1, 2, 5]"
            }
        ],
        constraints: [
            "1 <= arr.length <= 5 * 10^4",
            "-5 * 10^4 <= arr[i] <= 5 * 10^4"
        ],
        testCases: [
            { input: "4\n5 2 3 1", expectedOutput: "1 2 3 5", hidden: false },
            { input: "6\n5 1 1 2 0 0", expectedOutput: "0 0 1 1 2 5", hidden: false },
            { input: "5\n3 3 3 3 3", expectedOutput: "3 3 3 3 3", hidden: true }
        ],
        starterCode: {
            python: `def merge_sort(arr):
    # Implement merge sort algorithm
    # Return sorted array
    return arr

n = int(input())
arr = list(map(int, input().split()))

result = merge_sort(arr)
print(' '.join(map(str, result)))`,
            java: `import java.util.*;

public class Solution {
    public static int[] mergeSort(int[] arr) {
        // Implement merge sort algorithm
        return arr;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        int[] result = mergeSort(arr);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < result.length; i++) {
            if (i > 0) sb.append(" ");
            sb.append(result[i]);
        }
        System.out.println(sb);
    }
}`,
            c: `#include <stdio.h>
#include <stdlib.h>

void mergeSort(int* arr, int n) {
    // Implement merge sort algorithm in-place
}

int main() {
    int n;
    scanf("%d", &n);
    
    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    mergeSort(arr, n);
    
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    
    free(arr);
    return 0;
}`
        }
    }
};

// Helper function to get problem by ID
export const getProblemById = (id) => {
    return PROBLEMS[id] || null;
};

// Get all problems as array
export const getAllProblems = () => {
    return Object.values(PROBLEMS);
};

// Language display names
export const LANGUAGES = {
    python: { name: "Python", extension: ".py" },
    java: { name: "Java", extension: ".java" },
    c: { name: "C", extension: ".c" }
};
