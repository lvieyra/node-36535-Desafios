const argv = require('yargs')

    .option('port', { 
    alias: 'p', 
    describe: 'Port server to listen on', 
    type: 'string', 
    
    })
    .check((argv,options) => {
        
        if (argv.p && isNaN(argv.p)){
            throw 'El puerto es incorrecto';
        }
        return true;
    })
    .argv;

module.exports = argv;