/**
 * Check if email is valid
 * @param {string} email
 * @returns {boolean}
 */
 export const isValidEmail = (email) => {
	if (!email) {
		return false;
	}
	const emailValidPattern = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
	return emailValidPattern.test(email);
};