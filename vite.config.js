// vite.config.js
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'Amplitude',
            // the proper extensions will be added
            fileName: 'amplitude',
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            output: {
                sourcemap: true
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        }
    },
})