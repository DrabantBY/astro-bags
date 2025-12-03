module.exports = {
  plugins: [
    require("autoprefixer"),
    require("@csstools/postcss-global-data")({
      files: ["./src/styles/postcssmedia.css"],
      prepend: true,
    }),
    require("postcss-custom-media"),
  ],
};
