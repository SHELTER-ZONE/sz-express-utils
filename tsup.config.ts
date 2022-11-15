import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'],
  // entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  outDir: 'lib',
})
