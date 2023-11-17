import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: path.resolve(__dirname, 'client'), // Set the root to the client directory
	build: {
		outDir: path.resolve(__dirname, 'dist'), // Output directory for build files
		emptyOutDir: true, // Clear the output directory before building
	},
})
