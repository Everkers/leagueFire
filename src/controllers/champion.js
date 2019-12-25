const router = require('express').Router();
const championData = require('../utils/championData');
router.get('/:championName', async (req, res) => {
	try {
		const { championName } = req.params;
		const champion = new championData(championName);
		const { items, about: guide } = await champion.getItems();
		res
			.status(200)
			.send({ message: 'success', data: { build: { items, guide } } });
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: 'an error has occurred' });
	}
});
module.exports = router;
