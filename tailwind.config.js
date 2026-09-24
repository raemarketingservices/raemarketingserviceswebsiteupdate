/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: 'rgb(var(--brand-blue-rgb, 45 74 255) / <alpha-value>)',       // Azul principal dinámico
          light: 'rgb(var(--brand-light-rgb, 78 161 255) / <alpha-value>)',      // Azul claro dinámico
          navy: 'rgb(var(--brand-navy-rgb, 15 45 107) / <alpha-value>)',       // Azul oscuro dinámico
          navyDeep: '#081a3e',   // Navy ultra profundo para contrastes y footers
          navySurface: '#143885',// Navy intermedio
          grayLight: '#F2F4F8',  // Gris claro para fondos y equilibrio
          grayText: '#333333',   // Gris oscuro para textos
          muted: '#64748B',      // Gris neutro para subtítulos secundarios
          border: 'rgba(45, 74, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(15, 45, 107, 0.05)',
        'premium': '0 20px 40px -15px rgba(15, 45, 107, 0.08), 0 0 1px 1px rgba(45, 74, 255, 0.08)',
        'glow': '0 0 35px -5px rgba(45, 74, 255, 0.35)',
        'glow-lg': '0 0 60px -10px rgba(78, 161, 255, 0.45)',
        'card-hover': '0 22px 45px -10px rgba(15, 45, 107, 0.12), 0 0 0 1px rgba(45, 74, 255, 0.25)',
      },
      animation: {
        'float-slow': 'float var(--float-duration, 6s) ease-in-out infinite',
        'float-delayed': 'float calc(var(--float-duration, 6s) * 1.17) ease-in-out 2s infinite',
        'float-fast': 'float calc(var(--float-duration, 6s) * 0.83) ease-in-out 1s infinite',
        'pulse-subtle': 'pulseSlow calc(var(--float-duration, 6s) * 0.67) ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.04)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
