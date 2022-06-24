import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

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
		`mongodb+srv://${environmentVariablesConfig.mongoUser}:${environmentVariablesConfig.mongoPass}@${environmentVariablesConfig.dbHost}/${environmentVariablesConfig.database}`


    );
}catch(err){
    console.log(err)
}

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
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
	
	
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

    app.listen(environmentVariablesConfig.port, () => {
		console.log("Sapient Test Backend running on", environmentVariablesConfig.port)
	});

}
