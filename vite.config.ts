/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import eslint from 'vite-plugin-eslint';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),

			routes: `${path.resolve(__dirname, './src/routes/')}`,

			services: `${path.resolve(__dirname, './src/services/')}`,

			assets: `${path.resolve(__dirname, './src/assets/')}`,

			hook: `${path.resolve(__dirname, './src/hooks/')}`,

			context: `${path.resolve(__dirname, './src/context/')}`,

			config: `${path.resolve(__dirname, './src/config/')}`,

			styles: `${path.resolve(__dirname, './src/styles/')}`,

			utils: `${path.resolve(__dirname, './src/utils/')}`,

			pages: `${path.resolve(__dirname, './src/pages/')}`,

			ui: `${path.resolve(__dirname, './src/ui/')}`,
		},
	},
	build: {
		target: 'esnext',
		outDir: 'dist',
		sourcemap: false,
		rollupOptions: {
			output: {
				entryFileNames: 'index.js',
				chunkFileNames: 'js/chunk-[hash].js',
				assetFileNames: 'assets/assets-[hash].[ext]',
			},
		},
	},
	server: {
		open: true,
		https: {
			key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
			cert: fs.readFileSync(path.resolve(__dirname, './cert.pem')),
		},
		port: 4000,
		host: '0.0.0.0',
	},
});
