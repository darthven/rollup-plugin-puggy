import puggy from '../../index'

export default ({
  input: 'index',
  plugins: [
    puggy({
      input: ['./test/src1', './test/src2'],
      output: './test/dist'
    })
  ],
  output: [{
    file: 'bundle.js',
    format: 'esm'
  }]
});
