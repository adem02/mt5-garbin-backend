/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.test.ts)$': '<rootDir>/test/$1',
    },
    testMatch: [
        '**/test/unit/**/*.test.ts',
        '**/test/e2e/**/*.test.ts',
        '**/test/integration/**/*.test.ts'
    ],
    coveragePathIgnorePatterns: [
        'migrations',
        'test',
    ],
    collectCoverageFrom: [
        'src/server*.ts',
        'src/adapters/**/*.ts',
        'src/entities/**/*.ts',
        'src/useCases/**/*.ts',
        'src/utilities/**/*.ts',
    ]
};
