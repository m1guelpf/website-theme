const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'inherit': 'inherit',
		'none': 'none',
		'brand': 'var(--brand)',
        'yellow-300': 'var(--yellow-300)',
        'orange-400': 'var(--orange-400)',
        'sepia-500': 'var(--sepia-500)',
        'sepia-900': 'var(--sepia-900)',
        'sepia-300': 'var(--sepia-300)',
        'sepia-100': 'var(--sepia-100)',
        'blue-500': 'var(--blue-500)',
        'white': 'var(--white)',
		'black': 'var(--black)',
		'featured-theme-1': '#22D2A0',
		'featured-theme-2': '#E1CC13',
		'featured-theme-3': '#FD9065',
		'featured-theme-4': '#55CAE7',
      },
      fontFamily: {
        'sans-no-emoji': defaultTheme.fontFamily.sans.filter(font => !font.includes('Emoji')),
        'main': ['Protogrotesk', ...defaultTheme.fontFamily.sans],
        'mono': ['"Jetbrains Mono"', '"Operator Mono Lig"', '"Operator Mono"', '"Fira Code"', '"Source Sans Pro"', ...defaultTheme.fontFamily.mono]
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
      minHeight: {
        'auto': 'auto',
      },
      maxHeight: {
        'sm': '16rem'
      },
      maxWidth: {
        'screen': '100vw'
      },
      width: theme => {
        return theme('maxWidth')
	  },
	  lineHeight: {
		'6': '1.5rem'
	  },
	  backgroundSize: {
		2: '0.25rem 0.25rem',
	  },
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
