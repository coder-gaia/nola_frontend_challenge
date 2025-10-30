module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testMatch: ["**/tests/**/*.test.[jt]sx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/main.jsx", "!src/index.jsx"],
};
