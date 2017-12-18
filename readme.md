####Development
To start site developmen:
1) run `npm run startdevserver` to start the server.
2) run `npm run dev` to start the build tools.


To start blog development:
1) Run command 1 from above
2) Then run `npm blogdev`

####Production
Deployment:
If "DB is not ok" shows up:
1) Heroku run bash
2) knex-migrator init --mgpath node_modules/ghost

Notes:

Probably need to take this out of the postinstall
    "postinstall": "knex-migrator init /app/node_modules/ghost"
