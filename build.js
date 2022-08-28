import { build } from 'esbuild'
import npmDts from 'npm-dts'
const { Generator } = npmDts

// const dependencies = packageJson.dependencies
// const peerDependencies = packageJson.peerDependencies

const deps = ['dayjs', 'express', 'joi', 'jsonwebtoken', 'signale']

console.log('building...')

build({
  entryPoints: ['src/index.ts'],
  outdir: 'lib',
  format: 'esm',
  platform: 'node',
  bundle: true,
  minify: true,
  external: deps,
})

build({
  entryPoints: ['src/logger.ts'],
  outdir: 'lib/utils',
  format: 'esm',
  platform: 'node',
  bundle: true,
  minify: true,
  external: deps,
})

build({
  entryPoints: ['src/middleware/index.ts', 'src/middleware/validate.ts'],
  outdir: 'lib/middleware',
  format: 'esm',
  platform: 'node',
  bundle: true,
  minify: true,
  external: deps,
})

console.log('building done.')

console.log('generating types...')

try {
  new Generator({
    entry: 'src/index.ts',
    output: 'lib/index.d.ts',
  }).generate()
  console.log('all done.')
} catch (error) {
  console.log('generate types error')
}
