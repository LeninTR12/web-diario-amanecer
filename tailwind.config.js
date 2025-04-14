import daisyui from "daisyui";
import '@fontsource-variable/roboto';
import '@fontsource-variable/roboto-serif';

export default {
  content: [
    "./src/**/*.{astro,html,js,ts}", 
  ],
  theme: {
    extend: {
        colors:{
            primaryYellow:"#FBC208",
            primaryBlue:"#1A346B",
            titleBlue:"#081423",
            subtitleBlue:"#0E4F8F",
            paragraphGray:"#505050",
            paragraphBlack:"#202020",
        },
        fontFamily:{
            sans: ['Roboto Variable', 'sans-serif'],
            serif: ['Roboto Serif Variable', 'Times New Roman', 'Times', 'serif'],
        }
    },
  },
  plugins: [daisyui], 
};