import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss({
      config: "./src/assets/css/tailwind.config.js",
    }),
    autoprefixer(),
  ],
};
