const fs = require('fs');
const BigNumber = require('bignumber.js');

// Function to convert number from any base to decimal
function convertToDecimal(value, base) {
    if (base <= 10) {
        return BigNumber(value, base).toString(10);
    }
    return BigNumber(value.toLowerCase(), base).toString(10);
}

// Function to calculate determinant using Gaussian elimination
function determinant(matrix) {
    const n = matrix.length;
    let det = new BigNumber(1);
    
    for (let i = 0; i < n; i++) {
        // Find pivot
        let pivot = matrix[i][i];
        let pivotRow = i;
        
        for (let j = i + 1; j < n; j++) {
            if (matrix[j][i].abs().gt(pivot.abs())) {
                pivot = matrix[j][i];
                pivotRow = j;
            }
        }
        
        if (pivotRow !== i) {
            // Swap rows
            [matrix[i], matrix[pivotRow]] = [matrix[pivotRow], matrix[i]];
            det = det.negated();
        }
        
        det = det.times(matrix[i][i]);
        
        // Eliminate column
        for (let j = i + 1; j < n; j++) {
            const factor = matrix[j][i].div(matrix[i][i]);
            for (let k = i; k < n; k++) {
                matrix[j][k] = matrix[j][k].minus(matrix[i][k].times(factor));
            }
        }
    }
    
    return det;
}

// Function to solve the system using Cramer's rule
function solvePolynomial(points, k) {
    const matrix = [];
    const constants = [];
    
    // Create system of linear equations
    for (let i = 0; i < k; i++) {
        const row = [];
        const x = new BigNumber(points[i].x);
        const y = new BigNumber(points[i].y);
        
        for (let j = k - 1; j >= 0; j--) {
            row.push(x.pow(j));
        }
        
        matrix.push(row);
        constants.push(y);
    }
    
    // Calculate main determinant
    const mainDet = determinant(matrix.map(row => [...row]));
    
    // Calculate constant term (last coefficient)
    const constMatrix = matrix.map((row, i) => {
        const newRow = [...row];
        newRow[k - 1] = constants[i];
        return newRow;
    });
    
    const constDet = determinant(constMatrix);
    return constDet.div(mainDet);
}

function processTestCase(testCase) {
    const { n, k } = testCase.keys;
    const points = [];
    
    // Process points
    for (let i = 1; i <= n; i++) {
        if (testCase[i]) {
            const point = testCase[i];
            const y = convertToDecimal(point.value, parseInt(point.base));
            points.push({ x: i, y });
        }
    }
    
    // Take first k points and solve
    const selectedPoints = points.slice(0, k);
    const secret = solvePolynomial(selectedPoints, k);
    
    return secret.toString();
}

// Read and process test cases
function main() {
    const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
    const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));
    
    const output = [];
    output.push("Secret for Test Case 1: " + processTestCase(testCase1));
    output.push("Secret for Test Case 2: " + processTestCase(testCase2));

    fs.writeFileSync('output.txt', output.join('\n'), 'utf8');
}

main();
