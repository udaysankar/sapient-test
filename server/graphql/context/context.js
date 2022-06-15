import models from '../../models/index.js';

/**
 * Context function from Apollo Server
 */
export const context = async ({ req }) => {
	const context = {
		di: {
			model: {
				...models
			},		
		}
	};

	return context;
};
