/************************************************************************** 

This is the Rollup.JS configuration file.

To get the typescript plugin going:

    cd into the wwwroot/js directory where this file is:

    npm install tslib --save-dev
    npm install typescript --save-dev
    npm install @rollup/plugin-typescript --save-dev
    npm install @types/bootstrap --save-dev 
    npm install @rollup/plugin-node-resolve --save-dev 
    npm install --save-dev lodash
    npm install @types/jquery --save-dev
***************************************************************************/

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const inputPrefix = 'ts/pages/';
const outputPrefix = 'dist/';
const outputSuffix = '.bundle.js';

class RollupConfig
{
    constructor(input, output)
    {
        this.input = `${inputPrefix}${input}`;

        this.external = [
            'bootstrap'
        ];

        this.output = {
            // format: 'es',
            compact: true,
            sourcemap: true,
            file: `${outputPrefix}${output}${outputSuffix}`,
            inlineDynamicImports: true,
            interop: "auto",
            format: 'iife',
            
            globals: {
                bootstrap: 'bootstrap',
                jquery: '$',
            },
        }

        this.plugins = [
            typescript(),
            resolve({
                browser: true,
            }),
        ];

    }
}

const configs = [
    new RollupConfig('home/index.ts', 'home'),
    new RollupConfig('story/index.ts', 'story'),
];



// rollup.config.js
export default configs;