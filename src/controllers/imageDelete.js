const router = require('express').Router();
const imageHandler = require('../utils/imageHandler');
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const handlerImage = new imageHandler();
		const { result } = await handlerImage.deleteImage(id);
		if (result === 'ok') {
			res.status(200).send('the image has been deleted');
		} else {
			res
				.status(400)
				.send('an error has occurred while trying to delete image');
		}
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
