/** @type {import('tailwindcss').Config} */
module.exports = {
  // Class strategy to allow explicit ThemeService control (adds/removes `dark` on <html>)
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Design tokens (use via `text-primary`, `text-accent`, `bg-surface`, etc.)
        primary: {
          // Indigo family (#4F46E5)
          DEFAULT: '#4F46E5',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81'
        },
        accent: {
          // Teal family (#0D9488)
          DEFAULT: '#0D9488',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A'
        },
        // Back-compat token used in existing components.
        brand: {
          DEFAULT: '#4F46E5',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81'
        },
        surface: {
          DEFAULT: '#0B1220',
          100: '#111A2E',
          200: '#16213A'
        }
      },
      fontFamily: {
        // Use with `font-sans`.
        sans: [
          '"Plus Jakarta Sans"',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      },
      fontSize: {
        // Typography scale used by utility classes in src/styles.css
        'heading-xl': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        caption: ['0.875rem', { lineHeight: '1.25rem' }]
      },
      screens: {
        // Opinionated breakpoints for portfolio layouts
        xs: '480px',
        '3xl': '1920px'
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.9' }
        }
      },
      animation: {
        gradientShift: 'gradientShift 10s ease infinite',
        glowPulse: 'glowPulse 2.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
