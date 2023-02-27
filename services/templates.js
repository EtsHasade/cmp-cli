import { getKababCase } from "./util"

export const componentClassTemplate = (cmpName, style) => `
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

 export const componentFunctionTemplate = (cmpName, style) => `
//import React, { useState, useEffect } from 'react';
import './${cmpName}.${style}'

const ${cmpName} = (props) => {

    return (
        <div className='${getKababCase(cmpName)}'>${cmpName}</div>

    )
}

export default ${cmpName}
`

export const styleTemplate = (cmpName) => `
/*@import '../../style/setup/var.scss';*/

.${getKababCase(cmpName)} {}
`
