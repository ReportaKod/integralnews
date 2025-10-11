import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./app/**/*.{ts,tsx}", 
    "./sanity/**/*.{ts,tsx}",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      minHeight: {
        'hero': 'calc(100vh - 96px)',
      },
      backgroundImage: {
        'span-bg': 'var(--span-bg)'
      },
      colors: {
        background: 'var(--background)',
        primary: {
          DEFAULT: 'var(--primary)'
        },
        'button-secondary': 'var(--button-secondary)',
        'button-text': 'var(--button-text)',
        'text-secondary': 'var(--text-secondary)',
        'background-secondary': 'var(--background-secondary)',
        secondary: {
          DEFAULT: 'var(--secondary)', 
          '700': 'rgba(9, 127, 165, 0.8)'
        },
        button: {
          DEFAULT: 'var(--button)'
        },
        buttonlight: 'var(--button-light)',
        buttonxlight: 'var(--button-xlight)',
        selected: 'var(--selected)',
        dropdown: 'var(--dropdown)',
        dropdownHover: 'var(--dropdown-hover)',
        buttonSecondary: 'var(--button-secondary)'
      },
      boxShadow: {
        'secondary-blue': '0 7.4px 0 rgba(149, 127, 165, 0.7)', 
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'var(--rubik)', "var(--font-inter)"]
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'drop-in': 'drop-in 1s ease 200ms backwards',
        'drop-in-2': 'drop-in 1.2s ease 500ms backwards'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'drop-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    }
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    typography,
    require('tailwindcss-animate'),
    flowbite.plugin()
  ],
} satisfies Config;

