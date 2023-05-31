module.exports = {
  coverageDirectory: "coverage",
  testEnvironment: "node",
  collectCoverageFrom: ["**/src/**/*.js", "!**/src/main/**"],
  // setupFilesAfterEnv: ['./setup.js'],
  preset: "@shelf/jest-mongodb",
};
