module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js','./components/**/*.jsx', './pages/**/*.jsx',],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: '1fr 290px'
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'last'],
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
