module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      '.(css|less)$': '<rootDir>/src/__mocks__/style-mock.ts',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
