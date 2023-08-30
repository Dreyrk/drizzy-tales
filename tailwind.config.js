/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-black": "var(--light-black)",
        "transparent-white": "var(--transparent-white)",
        white: "#f4f4f6",
        primary: "#202020",
        secondary: "rgb(71 85 105)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        stars: "60% 40%",
      },
      keyframes: {
        "swipe-right-to-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "swipe-right-to-left-exit": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "0",
            display: "none",
          },
        },
        "swipe-left-to-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "swipe-left-to-right-exit": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "0",
            display: "none",
          },
        },
        "swipe-top-to-bottom": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "swipe-top-to-bottom-exit": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "0",
            display: "none",
          },
        },
        "swipe-bottom-to-top": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "swipe-bottom-to-top-exit": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100%)",
            opacity: "0",
            display: "none",
          },
        },
        "swipe-top-to-bottom-enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(-65%)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        oneSpin: {
          "0%": {
            transform: "rotate(0)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "swipe-right-to-left": "swipe-right-to-left 0.3s ease-in-out",
        "swipe-right-to-left-exit": "swipe-right-to-left-exit 0.3s ease-in-out",
        "swipe-left-to-right": "swipe-left-to-right 0.3s ease-in-out",
        "swipe-left-to-right-exit": "swipe-left-to-right-exit 0.3s ease-in-out",
        "swipe-top-to-bottom": "swipe-top-to-bottom 0.3s ease-in-out",
        "swipe-top-to-bottom-exit": "swipe-top-to-bottom-exit 0.3s ease-in-out",
        "swipe-bottom-to-top": "swipe-bottom-to-top 0.3s ease-in-out",
        "swipe-bottom-to-top-exit": "swipe-bottom-to-top-exit 0.3s ease-in-out",
        "swipe-top-to-bottom-enter":
          "swipe-top-to-bottom-enter 0.2s ease-in-out",
        "one-spin": "oneSpin 0.35s linear",
      },
    },
  },
  plugins: [],
};
