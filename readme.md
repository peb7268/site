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


#Preventing Satans arrival:

###need these env vars for db connection on prod :
    database__client:               mysql
    database__connection__database: heroku_d6140dbbff83350
    database__connection__host:     us-cdbr-iron-east-05.cleardb.net
    database__connection__password: 48a7d98b
    database__connection__user:     b5d1e148a9ba84
    database__pool__max:            20
    database__pool__min:            2
    url:                            https://imperativedesign.net/insights

###Initing ghost in a subdir (need this in server.js in the root of project):

    // //Init Ghost in a subdirectory
    ghost(env_config).then((ghostServer) => {
        console.log("==== In ghost bootup =====");
        console.log('utils subdir: ');
        
        app.use('/insights', ghostServer.rootApp); //change the url here to change where ghost is mounted 
        // do not use utils.url.getSubDir() it doesn't work.
        
        let paths = ghostServer.config.get('paths');
        paths.contentPath = "/app/insights/content"
        ghostServer.config.set('paths', paths);

        ghostServer.start(app);
    });

##Possible Errors: 

###Migrations missing : 
    heroku run bash
    knex-migrator migrate --mgpath node_modules/ghost

###User xxxxx has reached the max number of connections:

    https://dashboard.heroku.com/apps/imperative2017/resources
    Click on ClearDB
    CLick on Heroku DB
    On the Performance tab click the red X on all the current connections / query activity 