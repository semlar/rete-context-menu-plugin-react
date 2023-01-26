import sass from "rollup-plugin-sass";

export default {
  input: "src/index.jsx",
  name: "ContextMenuPlugin",
  globals: {
    lodash: "_",
    react: "React",
    "react-dom": "ReactDOM",
  },
  extensions: [".js", ".jsx"],
  babelPresets: [require("@babel/preset-react")],
  plugins: [
    sass({
      insert: true,
    }),
  ],
};
