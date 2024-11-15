const txoConfig = require('eslint-config-txo-typescript')

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...txoConfig.default,
]

module.exports = config
