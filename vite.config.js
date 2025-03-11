import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: ["vue"],
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],

  //*这个resolve是添加的别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
