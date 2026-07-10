export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {

      keyframes: {

        marquee: {
          "0%": {
            transform:
              "translateX(100%)",
          },

          "100%": {
            transform:
              "translateX(-100%)",
          },
        },

      },

      animation: {

        marquee:
          "marquee 30s linear infinite",

      },

    },
  },

  plugins: [],
};

// export default {
//   content: ["./index.html", "./src/**/*.{ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

