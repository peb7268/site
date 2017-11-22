var process = require('process');

module.exports = {
    database: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'user',
            password: 'password',
            charset: 'utf8',
            database: 'ghost'
        }
    },
    migrationPath: process.cwd() + '/core/server/data/migrations',
    currentVersion: 'your-current-database/project-version',
    subfolder: 'upgrades'  [default: versions]
}

module.exports = {
    database: {
        client: 'sqlite3',
        connection: {
            filename: 'path/to/your.db'
        }
    },
    migrationPath: process.cwd() + '/core/server/data/migrations',
    currentVersion: 'your-current-database-version'
}