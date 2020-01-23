const router = require('express').Router()
const imageHandler = require('../utils/imageHandler') //import image handler class
router.get('/', async (req, res) => {
	try {
		const { url, overlay } = req.query //get url from query object
		if (url && url.length > 1) {
			//check if the url exists
			const id = Math.floor(Math.random() * 1000) // random id for the picture
			const handlerImage = new imageHandler(url, id, overlay) // create new instance of the imageHandler class and pass the url and the id of the image
			const response = await handlerImage.uploadImage() //upload the image
			res.status(200).send({
				//send the url in the response
				message: 'success',
				url: response.eager[0].url,
				id,
			})
		}
		res.send({ message: 'there is no url' })
	} catch (err) {
		console.log(err)
		res.send({ message: err.message })
	}
})
module.exports = router
