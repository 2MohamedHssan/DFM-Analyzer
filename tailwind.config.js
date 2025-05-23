/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': 'rgb(var(--primary-50) / <alpha-value>)',
          '100': 'rgb(var(--primary-100) / <alpha-value>)',
          '200': 'rgb(var(--primary-200) / <alpha-value>)',
          '300': 'rgb(var(--primary-300) / <alpha-value>)',
          '400': 'rgb(var(--primary-400) / <alpha-value>)',
          '500': 'rgb(var(--primary-500) / <alpha-value>)',
          '600': 'rgb(var(--primary-600) / <alpha-value>)',
          '700': 'rgb(var(--primary-700) / <alpha-value>)',
          '800': 'rgb(var(--primary-800) / <alpha-value>)',
          '900': 'rgb(var(--primary-900) / <alpha-value>)',
          '950': 'rgb(var(--primary-950) / <alpha-value>)',
        },
        secondary: {
          '50': 'rgb(var(--secondary-50) / <alpha-value>)',
          '100': 'rgb(var(--secondary-100) / <alpha-value>)',
          '200': 'rgb(var(--secondary-200) / <alpha-value>)',
          '300': 'rgb(var(--secondary-300) / <alpha-value>)',
          '400': 'rgb(var(--secondary-400) / <alpha-value>)',
          '500': 'rgb(var(--secondary-500) / <alpha-value>)',
          '600': 'rgb(var(--secondary-600) / <alpha-value>)',
          '700': 'rgb(var(--secondary-700) / <alpha-value>)',
          '800': 'rgb(var(--secondary-800) / <alpha-value>)',
          '900': 'rgb(var(--secondary-900) / <alpha-value>)',
          '950': 'rgb(var(--secondary-950) / <alpha-value>)',
        },
        accent: {
          '50': 'rgb(var(--accent-50) / <alpha-value>)',
          '100': 'rgb(var(--accent-100) / <alpha-value>)',
          '200': 'rgb(var(--accent-200) / <alpha-value>)',
          '300': 'rgb(var(--accent-300) / <alpha-value>)',
          '400': 'rgb(var(--accent-400) / <alpha-value>)',
          '500': 'rgb(var(--accent-500) / <alpha-value>)',
          '600': 'rgb(var(--accent-600) / <alpha-value>)',
          '700': 'rgb(var(--accent-700) / <alpha-value>)',
          '800': 'rgb(var(--accent-800) / <alpha-value>)',
          '900': 'rgb(var(--accent-900) / <alpha-value>)',
          '950': 'rgb(var(--accent-950) / <alpha-value>)',
        },
        success: {
          '50': 'rgb(var(--success-50) / <alpha-value>)',
          '500': 'rgb(var(--success-500) / <alpha-value>)',
          '900': 'rgb(var(--success-900) / <alpha-value>)',
        },
        warning: {
          '50': 'rgb(var(--warning-50) / <alpha-value>)',
          '500': 'rgb(var(--warning-500) / <alpha-value>)',
          '900': 'rgb(var(--warning-900) / <alpha-value>)',
        },
        error: {
          '50': 'rgb(var(--error-50) / <alpha-value>)',
          '500': 'rgb(var(--error-500) / <alpha-value>)',
          '900': 'rgb(var(--error-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans Arabic', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        scaleIn: 'scaleIn 0.3s ease-in-out',
        slideInFromRight: 'slideInFromRight 0.3s ease-in-out',
        slideInFromLeft: 'slideInFromLeft 0.3s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};