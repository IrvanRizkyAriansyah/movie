module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.jsx"], // pastikan path ini sesuai dengan file setup Anda
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
