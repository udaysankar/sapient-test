import dotenv from 'dotenv';
dotenv.config();

import { ENVIRONMENT } from './environment.js';


/* Home doc */
/**
 * @file Environment variables configuration for the application
 * @see module:appConfig
 */

/* Module doc */
/**
 * Environment variables configuration for the application
 * @module appConfig
 */

const serverPortByDefault = 4000;

/**
 * Environment variables configuration
 * @typedef {Object}
 */
export const environmentVariablesConfig = Object.freeze({
	formatConnection: process.env.MONGO_FORMAT_CONNECTION || 'standard',
	dbHost: process.env.MONGO_HOST || 'localhost',
	dbPort: process.env.MONGO_PORT || '27017',
	database: process.env.MONGO_DB || 'SapientTest',
	mongoUser: process.env.MONGO_USER || '',
	mongoPass: process.env.MONGO_PASS || '',
	enviroment: (process.env.ENVIROMENT === ENVIRONMENT.DEVELOPMENT) ? ENVIRONMENT.DEVELOPMENT : ENVIRONMENT.PRODUCTION,
	port: Number(process.env.PORT) || serverPortByDefault
});

