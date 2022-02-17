

// rollup.config.js
export default 
[
    {
        input: 'pages/index.js',
        output: {
            file: 'dist/index.bundle.js',
            format: 'iife',
            compact: true,
            sourcemap: true,
        },
        // plugins: myPlugins,
    },
    {
        input: 'pages/story.js',
        output: {
            file: 'dist/story.bundle.js',
            format: 'iife',
            compact: true,
            sourcemap: true,
        },
        // plugins: myPlugins,
    },
];