// const path = require('path');
// const axios = require('axios');
// const cors = require('cors');
// const express = require('express');
// const app = express();


import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
// import favicon from 'serve-favicon';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import {
	ApolloServer
} from 'apollo-server-express';
import {
	UserInputError
} from 'apollo-server-errors';

import {
	ENVIRONMENT
} from './config/environment.js';
import {
	environmentVariablesConfig
} from './config/appConfig.js';

import {
	initTypeDefinition
} from './graphql/types/index.js';

import {
	resolvers
} from './graphql/resolvers/index.js';

import {
	context
} from './graphql/context/context.js';

import router from './routes/router.js';


try{
    mongoose.connect(
        `mongodb://${environmentVariablesConfig.dbHost}:${environmentVariablesConfig.dbPort}/${environmentVariablesConfig.database}`
    );
}catch(err){
    console.log(err)
}

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
	// logger.error(`Connection error with database. ${err}`);
});

db.once('open', () => {
    console.log("------ Database Connected -------")
    initApplication();

})

const initApplication = async ()=>{
    const app = express();
    app.use(cors({
		credentials: true
	}));
    app.use('', router);
    const typeDefs = await initTypeDefinition();
    const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: context,
		introspection: true, // Set to "true" only in development mode
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // Log all querys and their responses. Show playground (do not use in production)
		formatError (error) {
			if (!(error.originalError instanceof UserInputError)) {
				// logger.error(error.message);
                console.log(error)
			}

			return error;
		},
	});

    await server.start();

	server.applyMiddleware({
		app
	});

    // app.use((req, res) => {
	// 	res.status(404).send('404'); // eslint-disable-line no-magic-numbers
	// });

    // const buildPath = path.join(__dirname, '..', 'build');
    // // app.use(express.static(buildPath));

    // app.get('*', (req, res)=>{
    //     express.static(path.resolve(buildPath))
    // });



	
	
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
// app.get('*',  (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
// });


    app.listen(environmentVariablesConfig.port, () => {
		console.log("Sapient Test Backend running on", environmentVariablesConfig.port)
	});

}

// const PORT = process.env.PORT || 5000;

// const buildPath = path.join(__dirname, '..', 'build');
// app.use(express.static(buildPath));
// app.use(cors());

// app.get('/jobs', async (req, res) => {
//   try {
//     let { description = '', full_time, location = '', page = 1 } = req.query;

//     description = description ? encodeURIComponent(description) : '';
//     location = location ? encodeURIComponent(location) : '';
//     full_time = full_time === 'true' ? '&full_time=true' : '';
//     if (page) {
//       page = parseInt(page);
//       page = isNaN(page) ? '' : `&page=${page}`;
//     }
//     const query = `https://jobs.github.com/positions.json?description=${description}&location=${location}${full_time}${page}`;
//     const result = await axios.get(query);
//     res.send(result.data);
//   } catch (error) {
//     res.status(400).send('Error while getting list of jobs.Try again later.');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`server started on port ${PORT}`);
// });