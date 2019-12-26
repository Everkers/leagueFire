const router = require('express').Router();
const imageHandler = require('../utils/imageHandler');
router.get('/', async (req, res) => {
	// const deleteImage = promisify(cloudinary.uploader.destroy);
	try {
		const { url } = req.query;
		const id = Math.floor(Math.random() * 1000);
		const handlerImage = new imageHandler(url, id);
		const response = await handlerImage.uploadImage();
		res.status(200).send({
			message: 'success',
			url: response.eager[0].url,
			id
		});
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
