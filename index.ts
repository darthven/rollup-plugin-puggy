import { existsSync, mkdirSync, readdirSync, writeFileSync, PathLike } from 'fs'
import { Options, LocalsObject, compileFile } from 'pug'
import { Plugin } from 'rollup'

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

async function createBundle({ input, output, pugOptions, locals }: PuggyOptions): Promise<void> {
  for (let file of readdirSync(input as PathLike)) {
    writeFileSync(`${output}/${file.replace('pug', 'html')}`, compileFile(`${input}/${file}`, pugOptions)(locals))
  }
}

async function createMultipleBundles({ multipleBundles, pugOptions }: PuggyOptions): Promise<void> {
  for (let bundle of multipleBundles!) {
    createBundle({ ...bundle, pugOptions })
  }
}

export default function puggy(options: PuggyOptions): Plugin {
  const { input, output, multipleBundles, pugOptions } = options
  if (existsSync(input as PathLike)) {
    mkdirSync(output as PathLike)
    if (multipleBundles) {
      createMultipleBundles({ multipleBundles, pugOptions })
    } else {
      createBundle(options)
    }   
  } 
  return {
    name: 'rollup-plugin-puggy'
  }
}