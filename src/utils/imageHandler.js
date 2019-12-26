const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
module.exports = class ImageHandler {
	constructor(url, id) {
		this.url = url;
		this.id = id;
	}
	async uploadImage() {
		const url = this.url;
		const id = this.id;
		const upload = promisify(cloudinary.uploader.upload);
		const imageTransform = {
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
				public_id: id,
				eager: [imageTransform]
			});
			return response;
		} catch (err) {
			console.log(err);
			throw new Error('error while trying to upload the image');
		}
	}
	async deleteImage(id) {
		const destroy = promisify(cloudinary.uploader.destroy);
		try {
			const response = await destroy(id);
			return response;
		} catch (err) {
			console.log(err);
		}
	}
};
