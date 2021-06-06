const path = require('path')
import dts from 'vite-plugin-dts'

module.exports = {
  server: {
    open: '/demo/index.html'
  },
  build: {
    watch: {
      include: 'src/**/*.ts'
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Keywalk'
    }
  },
  plugins: [dts()]
}
