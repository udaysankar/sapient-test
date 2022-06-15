import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type User {
		email: String
		name: String
		primaryColor: String
	}

    input InputUser{
        email: String!
        name: String!
        primaryColor: String!
    }

	type Query {
		""" Get list of all users registered on database """
		listAllUsers: [User]
        getUserByEmail(email:String!):User
	}

    type Mutation {
		""" It allows users to register """
		registerUser(user:InputUser): User
        
        changeColor(user:InputUser): User
	}
`;