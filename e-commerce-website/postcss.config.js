module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 3, // You can adjust the stage according to your requirements
      features: {
        'nesting-rules': true, // Optional: Enable nesting rules if needed
      },
    },
  },
}
