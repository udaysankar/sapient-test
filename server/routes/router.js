import { Router } from 'express';
const router = Router();

/**
 * Example of route
 */
 router.get('/', (req, res) => {
	const status = 200;
	res.status(status).end();
});




export default router;
