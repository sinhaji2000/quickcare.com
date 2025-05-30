module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.jsx'],
    moduleFileExtensions: ['js', 'jsx'],
  };
  