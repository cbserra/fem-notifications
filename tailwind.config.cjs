/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['PlusJakartaSans', 'sans-serif']
    },
    colors: {
      white: 'hsl(0, 0%, 100%)',
      blue: 'hsla(219, 85%, 26%, 1)',
      red: 'hsla(1, 89%, 75%, 1)',
      'very-light-grayish-blue': 'hsl(210, 60%, 98%)',
      'light-grayish-blue-1': 'hsl(211, 68%, 94%)',
      'light-grayish-blue-2': 'hsl(205, 33%, 90%)',
      'grayish-blue': 'hsl(219, 14%, 63%)',
      'dark-grayish-blue': 'hsl(219, 12%, 42%)',
      'very-dark-blue': 'hsl(224, 21%, 14%)'
    },
    fontSize: {
      base: '62.5%',
      heading: [
        '2rem',
        {
          lineHeight: '2.5rem',
          fontWeight: '800'
        }
      ],
      body: [
        '1.4rem',
        {
          lineHeight: '1.8rem',
          fontWeight: '500'
        }
      ],
      'noti-count': [
        '1.6rem',
        {
          lineHeight: '2rem',
          fontWeight: '800'
        }
      ]
    }
  },
  plugins: []
}
