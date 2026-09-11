import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app:{
    head: {
      title: 'مستر رایس | برنج اصیل ایرانی',
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
        },
      ],
    },
  },
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBase: process.env.API_BASE_URL,
    
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  ssr:true,
});