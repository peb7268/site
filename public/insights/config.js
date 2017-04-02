// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/
//serving ghost via express as middleware : https://rogerstringer.com/2015/09/07/ghost-express-middleware/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'https://imperative2017.herokuapp.com/insights',
        fileStorage: false,
        mail: {
          transport: 'SMTP',
          host: 'smtp.mandrillapp.com',
          options: {
            service: 'Mandrill',
            auth: {
              user: process.env.MANDRILL_USERNAME,
              pass: process.env.MANDRILL_APIKEY
            }
          }
        },
        database: {
            client: 'postgres',
            connection: {
                host: process.env.POSTGRES_HOST,
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                port: '5432'
            },
            debug: false
        },

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.PORT
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:5000/insights',
        database: {
            client: 'postgres',
            connection: "postgres://zijhnjjcdzrrpk:4e48c98a0f822e42e5c131b71eb6c44538880f21820694372e2ea68a2f64c8a9@ec2-107-22-244-62.compute-1.amazonaws.com:5432/d7bgonh2hrv7r7",
            // connection: {
            //     host: 'ec2-107-22-244-62.compute-1.amazonaws.com',
            //     user: 'zijhnjjcdzrrpk',
            //     password: '4e48c98a0f822e42e5c131b71eb6c44538880f21820694372e2ea68a2f64c8a9',
            //     database: 'd7bgonh2hrv7r7',
            //     port: '5432'
            // },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
