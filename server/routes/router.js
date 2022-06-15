import { Router } from 'express';
const router = Router();

/**
 * Example of route
 */
//  router.get('/', (req, res) => {
// 	const status = 200;
// 	res.status(status).end();
// });

router.get('/test', (req, res) => {
	const status = 200;
	res.json({test:"test"}).end();
});


export default router;
