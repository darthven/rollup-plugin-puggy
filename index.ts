import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync, PathLike } from 'fs'
import { Options, LocalsObject, compileFile } from 'pug'
import { Plugin } from 'rollup'
import { isArray } from 'util'

type MultipleBundles = {
  input: PathLike | PathLike[]
  output: PathLike
  locals?: LocalsObject
} []

interface PuggyOptions {
  input?: PathLike | PathLike[]
  output?: PathLike
  locals?: LocalsObject
  multipleBundles?: MultipleBundles  
  pugOptions?: Options
}

async function preComplile(input: PathLike, output: PathLike) {
  if (existsSync(input as PathLike)) {
    if (existsSync (output as PathLike)) {
      for (let file of readdirSync(output as PathLike)) {
        unlinkSync(`${output}/${file}`)
      }
    } else {
      mkdirSync(output as PathLike)
    }
  }
}

async function preComplileAdvanced(input: PathLike | PathLike[], output: PathLike): Promise<void> {
  if (isArray(input)) {
    for (let ins of input) {
      preComplile(ins, output)
    }
  } else {
    preComplile(input, output)
  } 
}

async function createBundle({ input, output, pugOptions, locals }: PuggyOptions): Promise<void> {
  for (let file of readdirSync(input as PathLike)) {
    writeFileSync(`${output}/${file.replace('pug', 'html')}`, compileFile(`${input}/${file}`, pugOptions)(locals))
  }
}

async function createBundleAdvanced({ input, output, pugOptions, locals }: PuggyOptions): Promise<void> {
  if (isArray(input)) {
    for (let ins of input) {
      createBundle({ input: ins, output, pugOptions, locals })
    }
  } else {
    createBundle({ input, output, pugOptions, locals })
  }
}

async function createMultipleBundles({ multipleBundles, pugOptions }: PuggyOptions): Promise<void> {
  for (let bundle of multipleBundles!) {
    createBundleAdvanced({ ...bundle, pugOptions })
  }
}

export default function puggy(options: PuggyOptions): Plugin {
  const { multipleBundles } = options
  if (multipleBundles) {
    for (let bundle of multipleBundles) {
      preComplileAdvanced(bundle.input, bundle.output)
    }
    createMultipleBundles(options)
  } else {
    preComplileAdvanced(options.input!, options.output!)
    createBundleAdvanced(options)
  }   
  return {
    name: 'rollup-plugin-puggy'
  }
}
