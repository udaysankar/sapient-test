import { isValidEmail } from '../../helpers/validations.js';
import { UserInputError } from 'apollo-server-express';


/**
 * All resolvers related to users
 * @typedef {Object}
 */
 export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllUsers:  async (parent, args, context) => {
			return context.di.model.Users.find({});
		},
        getUserByEmail:  async (parent, {email}, context) => {
            // const email =args.email
            console.log(email)

            const isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({ email });

			if (!isAnEmailAlreadyRegistered) {
				throw new UserInputError('Data provided is not valid');
			}
			return context.di.model.Users.findOne({ email });
		}
	},
	Mutation: {
        registerUser: async (parent, {user}, context) => {
            console.log(user.email)
			if (!user.email || !user.name) {
				throw new UserInputError('Data provided is not valid');
			}

			if (!isValidEmail(user.email)) {
				throw new UserInputError('The email is not valid');
			}

            const email = user.email;
			const isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({ email });

			if (isAnEmailAlreadyRegistered) {
				throw new UserInputError('Data provided is not valid');
			}

			await new context.di.model.Users(user).save();

			const users = await context.di.model.Users.findOne({email});

			return users;
		},
        changeColor: async (parent, {user}, context) => {

            if (!user.email || !user.name) {
				throw new UserInputError('Data provided is not valid');
			}

			if (!isValidEmail(user.email)) {
				throw new UserInputError('The email is not valid');
			}

            const email = user.email;
			const isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({ email });

			if (!isAnEmailAlreadyRegistered) {
				throw new UserInputError('Data provided is not valid');
			}

			await context.di.model.Users.update({email:user.email},{primaryColor:user.primaryColor}).exec();

			const users = await context.di.model.Users.findOne({email});

			return users;
		},
      },

   
};
