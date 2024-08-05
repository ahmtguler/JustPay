import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
  },
  build: {
    sourcemap: false,
    
    rollupOptions: {
      
      plugins: [
        inject({ Buffer: ['buffer/', 'Buffer'] }),
        nodePolyfills({ crypto: true}),
      ],
    },
  },
  
  resolve: {
    alias: {
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
    },
  },
  define: {
    "process.env.ANCHOR_BROWSER": true,
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true }),
      ],
    }
  },
});
