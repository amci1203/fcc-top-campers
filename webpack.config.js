const webpack = require('webpack');

module.exports = {
    entry: './app/assets/app.jsx',
    output: './app/app.js',
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : './app/assets',
                loader : 'babel'
            }
        ]
    }
};
