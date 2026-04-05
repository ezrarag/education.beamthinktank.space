/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        education: {
          navy: '#1A3A5C',
          amber: '#F4A11D',
          cream: '#FAF7F2',
          charcoal: '#2C2C2C',
          white: '#FFFFFF',
          red: '#C0392B',
          ink: '#0D2236',
          line: 'rgba(26, 58, 92, 0.12)',
          muted: '#6B7684',
          panel: 'rgba(255, 255, 255, 0.82)',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair-display)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'education-grid':
          'linear-gradient(to right, rgba(26, 58, 92, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 58, 92, 0.08) 1px, transparent 1px)',
      },
      boxShadow: {
        research: '0 24px 80px rgba(16, 36, 58, 0.14)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
