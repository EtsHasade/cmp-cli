#!/usr/bin/env node

import fs from 'fs';
import path from 'node:path'
// const path = require('path');

const validOptions = {
    name: 'name',
    n: 'name',
    dir: 'dir',
    d: 'dir',
    style: 'style',
    s: 'style',
    cmpType: 'cmpType',
    'cmp-type': 'cmpType',
    ct: 'cmpType'
}

const defaultOptions = {
    dir: 'cmps',
    style: 'scss',
    cmpType: 'func'
}

const cleanOption = (op) => {
    if (op.includes('--')) {
        op = op.substr(2, op.length)
        return validOptions[op]
    }

    if (op.includes('-')) {
        op = op.substr(1, op.length)
        return validOptions[op]
    }

    throw "option name must start with '--' or '-"
}

const validateOption = (op) => {
    if (!validOptions[op]) throw `'${op}' is not a valid option!`
}

const validateValue = (val) => {
    if (val === null || val === undefined || val === '') {
        throw 'each option must have value!'
    }
}

const parseOptions = (args) => {
    const options = Object.assign({}, defaultOptions)

    for (let i = 0; i < args.length; i = i + 2) {
        const op = cleanOption(args[i])
        const val = args[i + 1]

        validateOption(op)
        validateValue(val)

        options[op] = val
    }

    if (!options.name) throw 'name is required!'

    return options
}

const getKababCase = (str) => {
    return str.split('').map((letter, idx) => {
        if (idx === 0) return letter.toLowerCase();
        const isUpper = (letter === letter.toUpperCase())
        return (isUpper) ? `-${letter.toLowerCase()}` : letter;
    }).join('');
}

const componentClassTemplate = (cmpName, style) => `
import React, { Component } from 'react'

import './${cmpName}.${style}'

class ${cmpName} extends Component {

    render() {
        return (
            <div className='${getKababCase(cmpName)}'>${cmpName}</div>
            
        )
    }
}

export default ${cmpName}
`

const componentFunctionTemplate = (cmpName, style) => `
//import React, { useState, useEffect } from 'react';
import './${cmpName}.${style}'

const ${cmpName} = (props) => {

    return (
        <div className='${getKababCase(cmpName)}'>${cmpName}</div>

    )
}

export default ${cmpName}
`

const styleTemplate = (cmpName) => {
    return `/*@import '../../style/setup/var.scss';*/

    .${getKababCase(cmpName)} {}`
}

const showHelp = () => {
    console.log('create-component usage:')
    console.log('node create-component --name <cmp-name> [--dir <name>] [--cmp-type <class|func>] [--style <type>]')
    console.log('')
    console.log('   --name      required')
    console.log(`   --dir       optional, default: ${defaultOptions.dir}`)
    console.log(`   --cmpType   optional, default: ${defaultOptions.cmpType}`)
    console.log(`   --style     optional, default: ${defaultOptions.style}`)
}

const run = () => {
    try {
        console.log("🚀 ~ file: create-component.js:125 ~ run ~ process.argv:", process.argv)
        const args = process.argv.splice(2)
        
        if (args[0] === '--help' || args[0] === '--') {
            showHelp()
            return
        }

        const options = parseOptions(args)
        const { name, dir, style, cmpType } = options
        const rootDir = path.join(`./src/${dir}/${name}`)

        fs.mkdirSync(rootDir);

        fs.writeFileSync(`${rootDir}/${name}.${style}`, styleTemplate(name))
        console.log(`${style} file created successfully`);

        const template = cmpType === 'class' ? componentClassTemplate : componentFunctionTemplate
        fs.writeFileSync(`${rootDir}/${name}.jsx`, template(name, style))
        console.log("component file created successfully");

        fs.writeFileSync(`${rootDir}/index.js`, `export { default } from './${name}.jsx'`);
        console.log("index.js file created successfully");
    } catch (e) {
        console.log('ERROR:', e.message ? e.message : e)
    }
}

run();


