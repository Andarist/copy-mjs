#!/usr/bin/env node
'use strict'

const yargs = require('yargs')
const chalk = require('chalk')
const copyMjs = require('..').default

const DONE_LABEL = chalk.green.inverse(' DONE ')
const ERROR_LABEL = chalk.red.inverse(' ERROR ')

yargs
	.command(
		'$0',
		'Copy `.js` files from input directory to `.mjs` files in output directory.',
		yargs =>
			yargs
				.option('input-dir', { default: 'esm', alias: 'i' })
				.option('output-dir', { default: 'lib', alias: 'o' })
				.option('cwd', { default: '.' }),
		options =>
			copyMjs(options)
				.then(files =>
					console.log(`\n🛠  ${DONE_LABEL} Successfully created .mjs files.\n`)
				)
				.catch(err => {
					console.error(`\n${ERROR_LABEL} ${err.stack}.\n`)
					process.exit(1)
				})
	)
	.help()
	.alias('help', 'h')
	.version()
	.alias('version', 'v')
	.strict().argv
