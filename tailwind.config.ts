import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '12px',
        screens: {
          md: '100%',
          lg: '1296px'
        }
      },
      colors: {
        background: '#FFFBF5',
        'brand-01': '#DC4B4A',
        'brand-02': '#FFFBF5',
        'gray-01': '#1E1E1E',
        'gray-02': '#4A4A4A',
        'gray-03': '#C6C6C6',
        'gray-04': '#F4F4F4'
      },
      fontFamily: {
        'noto-sans-tc': ['Noto Sans TC', 'sans-serif']
      },
      borderWidth: {
        '1': '1px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(180deg, #FFFBF5 0%, rgba(255, 251, 245, 0) 100%)'
      },
      keyframes: {
        spin1: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        spin2: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' }
        },
        spin3: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      },
      animation: {
        spin1: 'spin1 10s linear infinite',
        spin2: 'spin2 7s linear infinite',
        spin3: 'spin3 5s linear infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'),]
}

export default config
