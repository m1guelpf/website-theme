module.exports = {
  theme: {
    extend: {
      colors: {
        'inherit': 'inherit',
        'none': 'none',
        'yellow-300': 'var(--yellow-300)',
        'orange-400': 'var(--orange-400)',
        'sepia-500': 'var(--sepia-500)',
        'sepia-900': 'var(--sepia-900)',
        'sepia-300': 'var(--sepia-300)',
        'sepia-100': 'var(--sepia-100)',
        'blue-500': 'var(--blue-500)',
        'white': 'var(--white)',
        'black': 'var(--black)'
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'body': ['Noto Sans', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      letterSpacing: {
        px: '.1px'
      },
      padding: {
        '.2': '0.125rem',
        'header': 'calc(theme("padding.48") + theme("padding.4"))'
      },
      margin: {
        '.2': '0.125rem'
      },
      fontSize: {
        '5vw': '5vw',
        '8vw': '8vw',
      },
      fill: theme => {
        return theme('colors')
      },
      stroke: theme => {
        return theme('colors')
      },
      borderRadius: {
        'huge': '200px'
      },
      maxHeight: {
        'sm': '16rem'
      },
      maxWidth: {
        'screen': '100vw'
      }
    },
  },
  variants: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'active', 'dark',],
  plugins: [
    require('@tailwindcss/custom-forms'),
    function({ addVariant, e }) {
      addVariant('dark', ({ container, separator }) => {
        container.walkRules(rule => {
          rule.selector = `[data-dark] .${e(`dark${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }
  ],
}
