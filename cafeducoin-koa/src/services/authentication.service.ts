import bcrypt from 'bcrypt';

const getHashedPassword = (password: string) => {
	return new Promise<string>((resolve, reject) => {
		bcrypt.hash(password, 5, async (err, hash) => {
			if (err) {
				const error = 'Password hash error.';
				console.error(error);
				reject(error);
			} else {
				resolve(hash);
			}
		});
	});
}

const passwordMatchesWithHash = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
}

export default {
	getHashedPassword,
	passwordMatchesWithHash
}