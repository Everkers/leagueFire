const router = require('express').Router();
const championData = require('../utils/championData');
router.get('/:championName', async (req, res) => {
	try {
		const { championName } = req.params;
		const champion = new championData(championName);
		const build = await champion.getItems();
		const runes = await champion.getRunes();
		const skills = await champion.getSkillsOrder();
		if (build.items.length < 1) {
			res.send({ message: 'Champion not found' });
		}
		res.status(200).send({
			message: 'success',
			data: {
				champion: championName,
				build: { guide: build.about, items: build.items },
				runes: { guide: runes.guide, data: runes.runes },
				skillsOrder: { guide: skills.guide, order: skills.order }
			}
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: 'an error has occurred' });
	}
});
module.exports = router;
