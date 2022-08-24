
const { build } = require('esbuild')
const { Generator } = require('npm-dts')
const packageJson = require('./package.json')

const dependencies = packageJson.dependencies
const peerDependencies = packageJson.peerDependencies

console.log('building...')
build({
  entryPoints: ['src/index.ts', 'src/logger.ts'],
  outdir: 'lib',
  format: 'esm',
  bundle: true,
  minify: true,
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies)
  ],
})

build({
  entryPoints: [
    'src/middleware/index.ts',
  ],
  outdir: 'lib/middleware',
  format: 'esm',
  bundle: true,
  minify: true,
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies)
  ],
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
