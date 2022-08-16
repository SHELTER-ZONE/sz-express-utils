
const { build } = require('esbuild')
const { Generator } = require('npm-dts')
const packageJson = require('./package.json')

const dependencies = packageJson.dependencies
const peerDependencies = packageJson.peerDependencies

console.log('building...')
build({
  entryPoints: ['./src/index.ts'],
  outdir: './lib',
  format: 'cjs',
  bundle: true,
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies)
  ],
})

build({
  entryPoints: ['./src/lib/middleware/validate.ts'],
  outdir: './lib/middleware/validate',
  format: 'cjs',
  bundle: true,
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies)
  ],
})

console.log('building done.')

console.log('generating types...')
new Generator({
  entry: './src/index.ts',
  output: './lib/index.d.ts',
}).generate()

console.log('all done.')