#!/usr/bin/env node

import fs from 'fs';
import path from 'node:path'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { defaultOptions } = require('./cli.config.json')

import { parseOptions } from './services/optionParser.js';
import {
    componentClassTemplate,
    componentFunctionTemplate,
    styleTemplate
} from './services/templates.js';


createComponent()

function createComponent() {
    try {
        const args = process.argv.splice(2)
        
        if (args[0] === '--help' || args[0] === '--') {
            showHelp()
            return
        }
        
        const options = parseOptions(args)
        const { name, dir, style, cmpType } = options
        const rootDir = path.join(`./src/${dir}/${name}`)
        console.log("cmp-cli >> create component:\n", { name, dir, style, cmpType, rootDir })

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

function showHelp() {
    return `
create-component usage:
cmp-cli --name <cmp-name> [--dir <name>] [--cmp-type <class|func>] [--style <type>]

--name    (-n)  required
--dir     (-d)  optional, default: ${defaultOptions.dir}
--cmpType (-ct) optional, default: ${defaultOptions.cmpType}
--style   (-s)  optional, default: ${defaultOptions.style}
`
}



