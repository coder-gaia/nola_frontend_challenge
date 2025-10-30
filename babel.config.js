module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" }, modules: "auto" }],
    "@babel/preset-react",
  ],
  plugins: [
    [
      "babel-plugin-transform-import-meta",
      {
        importMeta: {
          env: {
            VITE_DEFAULT_START: "2023-01-01",
            VITE_DEFAULT_END: "2023-12-31",
            VITE_API_URL: "http://localhost:3001",
          },
        },
      },
    ],
  ],
};
