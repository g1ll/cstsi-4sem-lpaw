import { defineConfig } from 'vite'

export default defineConfig({

  // esbuild: {
  //   supported: {
  //     'top-level-await': true //browsers can handle top-level-await features
  //   },
  // },
  
  build: {
    target:'esnext'
  },
  publicDir:'../assets'
})