import { configure, processCLIArgs, run } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { snapshot } from '@japa/snapshot'

processCLIArgs(process.argv.splice(2))
configure({
  files: ['tests/**/*.spec.js'],
  plugins: [apiClient('http://localhost:3333'), snapshot()],
})

run()