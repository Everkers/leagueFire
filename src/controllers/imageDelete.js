const router = require('express').Router();
const imageHandler = require('../utils/imageHandler');
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params; //get image id from object
		const handlerImage = new imageHandler(); //create new instence of the imageHandler
		const { result } = await handlerImage.deleteImage(id); // get
		if (result === 'ok') {
			//check if image deleted
			res.status(200).send('the image has been deleted');
		} else {
			res.status(400).send('an error has occurre while trying to delete image');
		}
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
