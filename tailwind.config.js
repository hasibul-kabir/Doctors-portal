/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'bgImg': "url('/src/assets/images/appointment.png')",
        'bgFooter': "url('/src/assets/images/footer.png')"
      }
    },
  },
  plugins: [require("daisyui")],
}
