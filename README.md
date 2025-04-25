## Implementation Details

This solution uses JavaScript with the following key components:

- Uses BigNumber.js library for handling large numbers and precise calculations
- Implements base conversion for different number systems
- Uses Cramer's rule with Gaussian elimination to solve the system of equations
- Processes both test cases and outputs their secrets

## How to Run

1. Install required dependencies:

```bash
npm install bignumber.js
```

1. Save the test cases in separate JSON files (testcase1.json and testcase2.json)
2. Run the program:

```bash
node solution.js
```

## Notes

- The solution handles arbitrary bases up to base 16 (hexadecimal)
- Uses BigNumber.js to handle large numbers within the 256-bit constraint
- Implements a numerically stable version of Gaussian elimination
- Processes all points in the given format and converts them to decimal before calculations
