var nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
    entry: './handler.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs',
        path: __dirname + '.webpack',
        filename: 'handler.js'
    },
    mode: 'none'
}