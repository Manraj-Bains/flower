/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f9',
          100: '#eeeeF3',
          200: '#d7d7e3',
          300: '#b5b5cb',
          400: '#8a8aa8',
          500: '#68688a',
          600: '#53536f',
          700: '#3f3f56',
          800: '#2b2b3b',
          900: '#171723',
          950: '#0c0c14',
        },
        sage: {
          50: '#f2fbf7',
          100: '#dcf6ea',
          200: '#b8ead4',
          300: '#85d6b4',
          400: '#4fbe8e',
          500: '#2aa470',
          600: '#1d835a',
          700: '#19694a',
          800: '#15533c',
          900: '#114534',
          950: '#08271f',
        },
        blossom: {
          50: '#fff1f7',
          100: '#ffe4ef',
          200: '#ffc6dc',
          300: '#ff97c0',
          400: '#ff5c9f',
          500: '#f62d83',
          600: '#d91568',
          700: '#b10f53',
          800: '#8e1145',
          900: '#76123c',
          950: '#46061f',
        },
        sky: {
          50: '#f2fbff',
          100: '#def5ff',
          200: '#b6e9ff',
          300: '#7fd7ff',
          400: '#43bfff',
          500: '#1aa3ff',
          600: '#0a85e0',
          700: '#0b69b0',
          800: '#0f588f',
          900: '#114a76',
          950: '#082c49',
        },
      },
      boxShadow: {
        soft: '0 18px 45px -28px rgba(15, 23, 42, 0.35)',
        lift: '0 28px 65px -38px rgba(15, 23, 42, 0.55)',
        ring: '0 0 0 1px rgba(148, 163, 184, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Inter', 'Roboto', 'Arial', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 1.25s linear infinite',
      },
    },
  },
  plugins: [],
}

