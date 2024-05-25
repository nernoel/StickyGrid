module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('autoprefixer'),
    require('tailwindcss'),
  ]
}