const router = require('express').Router();
const imageHandler = require('../utils/imageHandler');
router.get('/', async (req, res) => {
	// const deleteImage = promisify(cloudinary.uploader.destroy);
	try {
		const { url } = req.query;
		if (url && url.length > 1) {
			const id = Math.floor(Math.random() * 1000);
			const handlerImage = new imageHandler(url, id);
			const response = await handlerImage.uploadImage();
			res.status(200).send({
				message: 'success',
				url: response.eager[0].url,
				id
			});
		}
		res.send({ message: 'there is no url' });
	} catch (err) {
		console.log(err);
		res.send({ message: err.message });
	}
});
module.exports = router;
