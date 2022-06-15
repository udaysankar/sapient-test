import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const UsersSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	name:{
		type: String,
		required: true,		
	},
	primaryColor:{
		type:String,
		required: true,
		default:'#cecece'
	}
	
});


export { UsersSchema };
