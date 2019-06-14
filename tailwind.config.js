module.exports = {
  theme: {
    colors: {
      'inherit': 'inherit',
      'sepia-500': 'var(--sepia-500)',
      'sepia-900': 'var(--sepia-900)',
      'sepia-300': 'var(--sepia-300)',
      'sepia-100': 'var(--sepia-100)',
      'blue-500': 'var(--blue-500)',
      'white': 'var(--white)',
      'black': 'var(--black)'
    },
    extend: {
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      letterSpacing: {
        px: '.1px'
      },
      padding: {
        '.2': '0.125rem'
      },
      margin: {
        '.2': '0.125rem'
      },
    },
  },
  variants: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'active'],
  plugins: [],
}
