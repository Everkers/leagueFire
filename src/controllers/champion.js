const router = require('express').Router();
const championData = require('../utils/championData');
router.get('/:championName', async (req, res) => {
	const { championName } = req.params;
	const champion = new championData(championName);
	const items = await champion.getItems();
	res.send(items);
});
module.exports = router;
