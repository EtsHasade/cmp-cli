import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { defaultOptions, validOptions } = require('../cli.config.json')



export const cleanOption = (op) => {
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

export const validateOption = (op) => {
    if (!validOptions[op]) throw `'${op}' is not a valid option!`
}

export const validateValue = (val) => {
    if (val === null || val === undefined || val === '') {
        throw 'each option must have value!'
    }
}


export const parseOptions = (args) => {
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
