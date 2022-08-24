
import { build } from 'esbuild'
import npmDts from 'npm-dts'
const { Generator } = npmDts

// const dependencies = packageJson.dependencies
// const peerDependencies = packageJson.peerDependencies

console.log('building...')
build({
  entryPoints: ['src/index.ts', 'src/logger.ts'],
  outdir: 'lib',
  format: 'esm',
  platform: 'node',
  // bundle: true,
  minify: true,
  // external: [
  //   ...Object.keys(dependencies),
  //   ...Object.keys(peerDependencies)
  // ],
})

build({
  entryPoints: [
    'src/middleware/index.ts',
  ],
  outdir: 'lib/middleware',
  format: 'esm',
  platform: 'node',
  // bundle: true,
  minify: true,
  // external: [
  //   ...Object.keys(dependencies),
  //   ...Object.keys(peerDependencies)
  // ],
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
