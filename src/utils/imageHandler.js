const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
module.exports = class ImageHandler {
	constructor(url, id) {
		this.url = url;
		this.id = id;
	}
	async uploadImage() {
		//upload the image to cloudinary
		const url = this.url; //url of the image
		const id = this.id; //id of the image
		const upload = promisify(cloudinary.uploader.upload); //convert function to asynchronous function
		const imageTransform = {
			//image transofrmations config
			transformation: [
				{ aspect_ratio: 0.82, crop: 'crop' },
				{ height: 1600, crop: 'scale' },
				{
					overlay: 'overlay-photo',
					flags: 'relative',
					height: '1.1',
					width: '1.1'
				}
			]
		};
		try {
			const response = await upload(url, {
				//upload image
				public_id: id,
				eager: [imageTransform]
			});
			return response; //return the data that we got from cloudinary
		} catch (err) {
			console.log(err);
			throw new Error('error while trying to upload the image');
		}
	}
	async deleteImage(id) {
		//delete image from cloudinary
		const destroy = promisify(cloudinary.uploader.destroy); //convert function to asynchronous function
		try {
			const response = await destroy(id); //pass the id of the image
			return response; //return the data that we got from cloudinary
		} catch (err) {
			console.log(err);
		}
	}
};
