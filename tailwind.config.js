/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'], // Esto fuerza la fuente redondita
      },
      colors: {
        'brand-brown': '#4d3b31', // El marrón oscuro del botón y textos
        'input-bg': '#f8f9fa', // El gris muy clarito de los inputs
      },
    },
  },
  plugins: [],
};
