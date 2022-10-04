import { build } from 'esbuild'
import npmDts from 'npm-dts'
const { Generator } = npmDts

// const dependencies = packageJson.dependencies
// const peerDependencies = packageJson.peerDependencies

const deps = ['dayjs', 'express', 'joi', 'jsonwebtoken', 'signale']

console.log('building...')

build({
  entryPoints: ['src/index.ts'],
  outdir: './dist',
  format: 'cjs',
  platform: 'node',
  target: ['node12'],
  bundle: true,
  minify: true,
  external: deps,
})

console.log('building done.')

console.log('generating types...')

try {
  new Generator({
    entry: 'src/index.ts',
    output: 'index.d.ts',
  }).generate()
  console.log('all done.')
} catch (error) {
  console.log('generate types error')
}
