import puggy from '../../index'

export default ({
  input: 'index',
  plugins: [
    puggy({
      multipleBundles: [
        {
          input: './test/src1',
          output: './test/dist1'
        },
        {
          input: './test/src2',
          output: './test/dist2'
        },
      ]
    })
  ],
  output: [{
    file: 'bundle.js',
    format: 'esm'
  }]
});
