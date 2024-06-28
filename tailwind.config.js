import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add your file paths here
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#8E7AB5',
        'custom-peach': '#B784B7',
        'custom-pink': '#E493B3',
        'custom-vintage': '#EEA5A6',
        'custom-peach1': '#E9A89B',
        'custom-begni': '#912BBC',
        'custom-lightpink': '#D6589F',
        'custom-lightpink2': '#D895DA',
      },
    },
  },
  plugins: [],
});
