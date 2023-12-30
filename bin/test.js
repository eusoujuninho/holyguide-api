import { assert } from '@japa/assert'
import { configure } from '@japa/runner'

configure({
  files: ['tests/**/*.spec.js'],
  plugins: [assert()]
})
