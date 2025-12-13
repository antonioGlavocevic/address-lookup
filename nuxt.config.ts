import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
          integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
          crossorigin: "",
        },
      ],
    },
  },
  css: ["./app/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
