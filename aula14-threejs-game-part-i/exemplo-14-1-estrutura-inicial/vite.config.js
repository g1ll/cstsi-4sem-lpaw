import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap:true,
  },
  publicDir:'../assets'
})