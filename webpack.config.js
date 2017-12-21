let path = require('path');

module.exports = {
    entry: {
        app: ['./src/js/main.js']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/js/',
        filename: 'app.js'
    }
};