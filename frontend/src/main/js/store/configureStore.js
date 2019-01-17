if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
    console.log('enable prod mode');
} else {
    module.exports = require('./configureStore.dev');
    console.log('enable dev mode');
}
