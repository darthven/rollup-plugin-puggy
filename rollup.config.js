import puggy from './index'

export default ({
  input: 'index',
  plugins: [
    puggy({
      // input: './src1',
      // output: './dist'
      multipleBundles: [
        {
          input: './src1',
          output: './dist1'
        },        
        {
          input: './src2',
          output: './dist2'
        },        
      ]     
    })
  ],
  output: [{
    file: 'bundle.js',
    format: 'esm'
  }]
});