module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js','./components/**/*.jsx', './pages/**/*.jsx', './lib/markdownToHtml.js'],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: '1fr 290px'
      },
      colors: {
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              'p': {
                'white-space': 'pre-wrap',
                'word-wrap': 'break-word'
              }
            }
          ]
        }
      })
    },
  },
  variants: {
    borderWidth: ['responsive', 'last'],
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
