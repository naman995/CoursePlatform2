/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-custom-color": "#4D5EDC",
        "footer-custom-color": "#000000",
        "navbar-custom-color": "#FFFFFF",
        "card-hover-custom-color": "#101010",
        "stats-custom-color": "#EFEFEF",
        "text-custom-color": "#565656",
        "blogCard-custom-color": "#F2F2F2",
        "login-background-custom-color": "#1C1C1C",
        "text-white-custom-color": "#F4F3F3",
        "placeholder-gray-custom-color": "#7D7D7D",
        "signUp-blue-custom-color": "#00F0FF",
        "login-text-custom-color": "#BDB8B8",
        "yellow-custom-color": "#FFA03A",
        "login-button-custom-color": "#4A47EF",
        "bg-loginSignUp-custom-color": "#2B2B2B",
        "sidebar-bg": "#242424",
        "checkout-page-bg": "#f3f3f3",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90.99deg, #FDD23A -3.36%, #FEF0BC 27.57%, #FFDA58 51.15%, #FBE081 69.05%, #DBAF14 95.88%)",
        Icongradient:
          "linear-gradient(93.01deg, #0D42FC -19.46%, #F534F9 135.23%)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
