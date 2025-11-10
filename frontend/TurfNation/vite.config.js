// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          keyframes: {
            fadeIn: {
              "0%": { opacity: "0" },
              "100%": { opacity: "1" },
            },
            slideInLeft: {
              "0%": { opacity: "0", transform: "translateX(-50px)" },
              "100%": { opacity: "1", transform: "translateX(0)" },
            },
            slideInRight: {
              "0%": { opacity: "0", transform: "translateX(50px)" },
              "100%": { opacity: "1", transform: "translateX(0)" },
            },
            glow: {
              "0%, 100%": {
                boxShadow: "0 0 20px rgba(34,197,94,0.6)",
              },
              "50%": {
                boxShadow: "0 0 35px rgba(34,197,94,0.9)",
              },
            },
          },
          animation: {
            fadeIn: "fadeIn 1s ease-in-out",
            slideInLeft: "slideInLeft 0.8s ease-out",
            slideInRight: "slideInRight 0.8s ease-out",
            glow: "glow 3s ease-in-out infinite",
          },
        },
      },
    }),
  ],
});
