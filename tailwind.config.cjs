const animate = require('tw-animate-css');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        'primary-deep': 'var(--primary-deep)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        // seasons
        'season-spring': 'var(--season-spring)',
        'season-summer': 'var(--season-summer)',
        'season-autumn': 'var(--season-autumn)',
        'season-winter': 'var(--season-winter)',
        'season-all': 'var(--season-all)',
        // difficulty
        'difficulty-easy': 'var(--difficulty-easy)',
        'difficulty-medium': 'var(--difficulty-medium)',
        'difficulty-hard': 'var(--difficulty-hard)',
        // cost
        'cost-low': 'var(--cost-low)',
        'cost-mid': 'var(--cost-mid)',
        'cost-high': 'var(--cost-high)',
      },
    },
  },
  plugins: [animate],
};
