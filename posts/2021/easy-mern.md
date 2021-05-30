---
date: "2021-05-26"
title: "Run Mongo + Express + React + Node with a Single Command"
section: 'software'
---

Almost two years ago, I posted a [video covering a niche use-case](https://youtu.be/TTZOoWfGjCo) of running a React and Express development environment from a single command. The video turned out to be the most successful video of my new YouTube channel, and still continues to push things forward.

_If you would like to just see the code, skip ahead to the repo!_ :) [https://github.com/RushingLabs/easy-mern](https://github.com/RushingLabs/easy-mern)

<br />

## Strategy: What are we doing?

Considering the previous video automated React & Express (_and a touch of Node.js_) behind a single command, the next step would seem to be...to add Mongo DB to the mix.

So, Mongo DB + Express + React + Node.js, all behind a single command is what we're after. This is basically a monolithic MERN-stack app. While that doesn't follow the modern trends of service-oriented-architecture and microservices, it's still a useful way to run a MERN development environment.

The tool central to this functionality is the `concurrently` package. It allows us to run multiple processes from Node.js simultaneously.

[https://www.npmjs.com/package/concurrently](https://www.npmjs.com/package/concurrently)

Basically, the `"scripts"` section of our `package.json` is going to look a little something like this when we're done.

```js
"scripts": {
    "dev": "concurrently --kill-others \"npm run server\" \"npm run start\" \"npm run db\"",
    "server": "echo Starting server...",
    "client": "echo Starting client...",
    "db": "echo Starting database..."
}
```
<br />

## Install & Setup

First, let's create our directory, `easy-mern`, and in there create an empty Node.js application.

```bash
mkdir easy-mern
cd easy-mern
npm init
```

Then inside our new Node app, we'll create a directory for the server, and we'll hold off on the front-end for now.

```bash
mkdir src
cd src
mkdir server
```

### Install: React

Let's quickly get our front-end off the ground. Still in `easy-mern`, we're going to run `npx create-react-app client`. It may seem like we need to create a folder for the React application, but doing it this way, `create-react-app` is going to create that directory for us.

```bash
cd client
npx create-react-app client
```

This may seem a little weird--once this command finishes we will have a full React application, built by [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html), inside our `client` directory. This includes it's own `package.json` and everything. 

### Install: npm packages

Ok, with that done we can move onto the configurations that help us run the server and start the database. We want to `cd ..` back to our main directory, `easy-mern`.

First, we're going to install [`concurrently`](https://www.npmjs.com/package/concurrently).

```bash
npm install concurrently --save
```

Then (if you don't already have it) we need to _globally install_ [`nodemon`](https://www.npmjs.com/package/nodemon). See [this StackOverflow post](https://stackoverflow.com/questions/40359590/nodemon-command-is-not-recognized-in-terminal-for-node-js-server) for why this package needs a global install.

```bash
npm install -g nodemon
```

And then the rest of our packages...

```bash
npm install --save-dev body-parser dotenv express mongodb
```

### Install: MongoDB

At this point we need to break away from our terminal to install MongoDB. Since I'm running all of this from Windows, I just used the GUI installer. Use whatever you need for your OS.

_The important piece is to keep track of your **install directory** and **data directory**._

Download: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

_Note: I'm installing MongoDB as a service._

You can keep track of the default data directory, or we'll create a custom one later to keep the path short.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_easy-mern/mongodb-install-01.png" />

After the install, we're dropped into Compass, where we can connect to our database, and create our first database and collection.

If MongoDB is running on your local system, you can use the default connection: `mongodb://localhost:27017`.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_easy-mern/mongodb-install-02.png" />

So that we'll have a database to read from later, we'll create one now in Compass. Click "Create Database" on the main window and fill in the details.

- Database: website
- Collection: sample-store

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/post_easy-mern/mongodb-createdb.png" />

<br />

## Start Mongo DB from CLI

Now we need to figure out how to start Mongo DB from the terminal (CLI). Being able to do this, gives us our proof-of-concept for what to finally put in our `package.json`.

To learn how to do this, I read through this [help article from Vithal Reddy](https://medium.com/stackfame/run-mongodb-as-a-service-in-windows-b0acd3a4b712). It helped me understand what was happening, but we'll cover the high points here.

For a shorter path to the data directory, I created a directory below the root of the drive. Not ideal, but keeps things usable.

```bash
mkdir C:\mongo-data
```

Then, we can open Command Prompt (cmd), and see how this works. After moving to the install directory where the `mongod.exe` is located, our becomes the following.

```bash
cd "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe"
.\mongod --dbpath C:\mongo-data
```

But this two-line approach is cumbersome to attempt in our `package.json`. So, a small adjustment and we are left with the following.

Test run in `cmd`

```bash
"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath C:\mongo-data
```

`"db" script` in `package.json`

```bash
"db": "cd C:\\Program Files\\MongoDB\\Server\\4.4\\bin && .\\mongod --dbpath C:\\mongo-data",
```

<br />

## Connect the App

### Front-end: React

Ok, now that we have Mongo DB installed _and we know_ we can start it from the terminal...let's get back to our application. Keep in mind, our project directory should hold this shape:

```bash
easy-mern/
- src/
  - client/
    - [React-app-files]
    - package.json
  - server/
package.json
```

First, let's make sure our front-end can talk to our server. We're going to add a proxy to `/client/package.json`. No need for any package, we only need to add `"proxy": "http://localhost:5500",` near the top of our `package.json` file.

Notice the port selection here. It is the _same port_ our server will use, and it's important that it doesn't interfere with any port configurations for React or Mongo DB. Since we're using defaults (React: 3000, Mongo: 27017) we should be fine.

```json
{
  "name": "easy-mern-frontend",
  "proxy": "http://localhost:5500",
  "dependencies": {
      /* dependency list */
  },
  /* rest of file - removed for brevity */
}
```

Keep in mind, `create-react-app` has already built out a functioning React app for us, when we started. So, this is all we need to do for now.

### Back-end: Express + Mongo

Now let's move into `\server`

```bash
cd .. 
cd server
```

In our server directory, we're going to create three files: `server.js`, `db.js`, and `routes.js`.

```bash
touch server.js
touch db.js
touch routes.js
```

In `\server\server.js`, paste this code. Here, we are pulling in our dependencies, setting up some variables and pulling in the `db.js` and `routes.js`, and then kicking off server initialization.

**`\server\server.js`**

```js
const express = require('express'); // backend server
const envVar = require('dotenv').config(); // environment variables
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5500;
const initializeDatabases = require('./db');
const routes = require('./routes');

initializeDatabases().then(dbs => {
	// Initialize the application once database connections are ready.

	routes(app, dbs, express, path, fs)
        .listen(port, () => console.log(`Listening on port ${port}`) )
});
```

Now, put this code in `\server\db.js`. In the first two lines we pull in `MongClient` and establish our connection string, so we have the means to talk to Mongo DB. Then in `connect()` we are actually making the connection. 

Finally, `module.exports` wraps our connection in a `Promise`, and notice that it attaches our database connection in an object to the key, `siteData`.

**`\server\db.js`**

```js
const MongoClient = require('mongodb').MongoClient;
const _conn_str = 'mongodb://localhost:27017/website';

function connect(url) {
	return MongoClient.connect(_conn_str, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db());
};
module.exports = async function() {
	let databases = await Promise.all([ connect(_conn_str) ]);
	return { siteData: databases[0] };
}
```

The last part to our back-end, `\server\routes.js`. We only define one route, and export it so `server.js` can pull it into its configuration. This single route answers to `GET` requests, and queries the `sample-store` collection in Mongo DB, for all of its documents.

Notice the `app` variable is provided from Express (you can see this by tracing it back to `server.js`), and our `siteData` key shows up again as this route returns the results from a Mongo DB query. 

This file is where you would add more routes if you wanted to extend the back-end functionality of this working example.

**`\server\routes.js`**

```js
module.exports = function(app, dbs) {

	app.get('/api/getData', (req, res) => {
		dbs.siteData.collection('sample-store').find({})
			.toArray( (err, docs) => {
				if (err) {
					console.log(err);
					res.error(err);
				} else {
					res.json(docs);
				}
			});
	});

	return app;
};
```

### Connecting the Scripts

Now back in our main `package.json` (location: `easy-mern\package.json`), we can flesh out the rest of our scripts to start everything. So, here's the whole `"scripts"` section, and then let's break this down.

```json
"scripts": {
    "dev": "concurrently --kill-others \"npm run server\" \"npm run start\" \"npm run db\"",
    "server": "cd src\\server && nodemon server.js",
    "client": "cd src && npm start",
    "db": "cd C:\\Program Files\\MongoDB\\Server\\4.4\\bin && .\\mongod --dbpath C:\\mongo-data"
  }
```

**`"dev"`**

This is where we use `concurrently` to run all of our scripts at once, and the `--kill-others` option will automatically kill all processes if _any one_ of them dies. Since we want to run three things (front-end, back-end, database), then we associate those behind their own npm scripts, and we pass those scripts to `concurrently`.

Check `concurrently`'s Usage section for more info: [https://www.npmjs.com/package/concurrently#usage](https://www.npmjs.com/package/concurrently#usage)

```json
"dev": "concurrently --kill-others \"npm run server\" \"npm run start\" \"npm run db\"",
```

**`"server"`**

_Keep in mind, our directory structure for this project!_ Here, we `cd` to our server's directory, and start the process with `nodemon`. We start the server this way because `nodemon` will monitor our server for file changes. If any are detected, it automatically restarts the server for us! :D

`nodemon`, see: [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)

```json
"server": "cd src\\server && nodemon server.js",
```

**`"client"`**

Our `client` script is pretty straightforward, but remember `create-react-app` created another `package.json` inside our `client` directory. So the `npm start` portion of this command will run the `start` script in that file--_not this one_.

```json
"client": "cd src\\client && npm start",
```

**`"db"`**

Finally, we have the database script. This is mostly a copy/paste of what we created earlier by making sure we could start the database from the terminal. We've added double-backslashes for escaping. Still, we `cd` into Mongo's install directory using the full path, and join this with `&&` to run `.mongod` with the `--dbpath` option set.

```json
"db": "cd C:\\Program Files\\MongoDB\\Server\\4.4\\bin && .\\mongod --dbpath C:\\mongo-data"
```
<br />

## All Together Now!

So now, from the terminal, sitting in our `easy-mern/` directory, we should be able to issue a single command to start all three pieces of our application!

```bash
npm run dev
```

In your terminal you should see output from:

- `concurrently` showing it's running the configured scripts
- `react-scripts` reporting that React is starting
- A few lines showing `nodemon` started the server
- And finally, MongoDB dumps a bunch of information without config to turn down verbosity

### Bonus...

You may have noticed we put hard-coded, full directory paths in the `package.json` and that could be problematic when/if things change. Well, we can utilize variables in our `package.json`, but beware--this lacks some cross-platform abilities--so use with caution!

Basically, npm allows variables to be accessed via the prefix, `$npm_package_*`, followed by an underscore pattern for each level of objects configured in `package.json`. For example, `$npm_package_yourvar_isNested`. _However!_, on Windows the single, leading `$` is exchanged for surrounding `%%`, like `%npm_package_yourvar_isNested%`.

On a *nix-like system:

```json
/* Accessed with... */
"scripts": {
    "db": "cd $npm_package_config_mongodir"
},
/* and then defined as... */
"config": {
    "mongodir": "~\\my\\mongo\\location",
    "mongodata": "~\\my\\data"
}
```

On Windows:

```json
/* Accessed with... */
"scripts": {
    "db": "cd %npm_package_config_mongodir%"
},
/* and then defined as... */
"config": {
    "mongodir": "C:\\Program Files\\MongoDB\\Server\\4.4\\bin",
    "mongodatadir": "C:\\mongo-data"
}
```

For a more in-depth explanation, take a look at [this article](https://brianchildress.co/variables-in-package-json/) from Brian Childress, and the supporting (ever-present) [StackOverflow post](https://stackoverflow.com/questions/43705195/how-can-i-use-variables-in-package-json) explaining the environment differences.

- [https://brianchildress.co/variables-in-package-json/](https://brianchildress.co/variables-in-package-json/)
- [https://stackoverflow.com/questions/43705195/how-can-i-use-variables-in-package-json](https://stackoverflow.com/questions/43705195/how-can-i-use-variables-in-package-json)


<br />

<hr />

### Credit

"Run MongoDB as a Service in Windows", Vithal Reddy - [https://medium.com/stackfame/run-mongodb-as-a-service-in-windows-b0acd3a4b712](https://medium.com/stackfame/run-mongodb-as-a-service-in-windows-b0acd3a4b712)

"Variables in package.json", Brian Childress - [https://brianchildress.co/variables-in-package-json/](https://brianchildress.co/variables-in-package-json/)