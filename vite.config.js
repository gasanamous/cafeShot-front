import { defineConfig } from 'vite'
import fs from "fs"
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: false,
    host: 'localhost',
    port: 5173,
  }
});

