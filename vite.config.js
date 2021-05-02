const path = require('path')

module.exports = {
  server: {
    open: '/demo/index.html'
  },
  build: {
    watch: {
      include: 'src/**/*.ts'
    },
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Keywalk'
    }
  }
}
