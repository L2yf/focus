import react from '@vitejs/plugin-react';
import path from 'node:path';
import { createRequire } from 'node:module';
import { defineConfig, normalizePath } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { getv } from 'getn';
import colorize from 'json-colorizer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// 配置文件
const configPath = path.resolve(__dirname, process.env.XCONF_PATH || './config/dev.cjs');
const configData = await import(configPath) || {};
const config = configData.default || {};
const basePath = `${getv(config, 'env.base', '')}`;
console.log(`Build with configuration in ${configPath}:`);
console.log(colorize(JSON.stringify(config, null, 2)));

// 当前环境
const env = process.env.NODE_ENV;

// 是否清屏
const clearScreen = env === 'development';

// react-pdf配置
const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
);
const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'),
);

export default defineConfig({
  clearScreen,
  root: 'client/entry',
  base: `${basePath}/`,
  mode: env,
  build: {
    outDir: '../../dist',
    rollupOptions: {
      manualChunks: {
      },
      plugins: [visualizer()],
    },
  },
  define: {
    'CONFIG': `${JSON.stringify(config)}`,
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: 'assets/' },
        { src: standardFontsDir, dest: 'assets/' },
      ],
    }),
  ],
  resolve: {
    alias: {
      'client': path.resolve(__dirname, './client'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 30175,
    strictPort: true,
    https: false,
    proxy: {
      [`${basePath}/api`]: {
        target: 'http://127.0.0.1:30174',
        changeOrigin: true,
      },
    },
  },
});

