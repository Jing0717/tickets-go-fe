import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
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
      }
    }
  },
  plugins: []
}

export default config
