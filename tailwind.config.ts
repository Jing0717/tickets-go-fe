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
        background: '#FFFBF5'
      },
      fontFamily: {
        'noto-sans-tc': ['Noto Sans TC', 'sans-serif']
      }
    }
  },
  plugins: []
}
export default config
