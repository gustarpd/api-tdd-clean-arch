export const moduleNameMapper = {
  '~(.*)': '<rootDir>/src$1',
};
export const testEnvironment = 'node';
export const testMatch = [
  '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
  '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  '<rootDir>/src/main/**/?(*.)+(test)'
];
export const transform = {
  '^.+\\.js$': 'babel-jest',
};

export default {
  moduleNameMapper,
  testEnvironment,
  testMatch,
  transform
}