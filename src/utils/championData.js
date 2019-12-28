const request = require('request');
const cheerio = require('cheerio');

//class to get all the data of a champion
module.exports = class ChampionData {
	constructor(championName) {
		this.championName = championName; // champion name
		this.url = `https://rankedboost.com/league-of-legends/build/${this.championName}`; // url from the website that we will scrap the data from
	}

	//get best items for the champion
	async getItems() {
		const data = [];
		data.items = [];
		return new Promise((resolve, reject) => {
			try {
				request(this.url, (response, err, html) => {
					const $ = cheerio.load(html); //load the html with cheerio module to be able to grab data from the website
					$('.rb-build-off-item-contain').each(
						// loop through all the divs with the id of (rb-build-off-item-contain)
						(i, elm) => {
							const element = $(elm).text(); //get div content
							if (element.includes('Item Build')) {
								//check if the div content includes (items build)
								$(elm)
									.find('img') //find images from this div
									.each((i, elm) => {
										//from each image
										data.items.push($(elm).attr('title')); //get title attr of image
									});
							}
						}
					);
					data.about = $('#item-build > p').text(); //get guide
					resolve(data);
				});
			} catch (err) {
				reject(err);
			}
		});
	}
	async getRunes() {
		return new Promise((resolve, reject) => {
			try {
				request(this.url, (response, err, html) => {
					const $ = cheerio.load(html);
					const guide = $('#runes > p').text();
					const data = [];
					data.runes = {};
					data.guide = guide;
					data.runes.primary = [];
					data.runes.secondary = [];
					data.runes.third = [];
					$('#runes .rb-build-rune-container').each((i, elm) => {
						const element = $(elm).text();
						if (element.includes('Primary')) {
							$('.rb-build-runes-keystone', elm).each((i, runeElm) => {
								const key = $(runeElm).text();
								if (key.includes('Primary')) {
									const text = $(runeElm)
										.text()
										.replace('Primary', '');
									data.runes.primary.push(text);
								} else {
									data.runes.primary.push(key);
								}
							});
						}
						if (element.includes('Secondary')) {
							$('.rb-build-runes-keystone', elm).each((i, runeElm) => {
								const key = $(runeElm).text();
								if (key.includes('Secondary')) {
									const text = $(runeElm)
										.text()
										.replace('Secondary', '');
									data.runes.secondary.push(text);
								} else {
									data.runes.secondary.push(key);
								}
							});
						}
						if (element.includes('Third')) {
							$('.rb-build-runes-keystone', elm).each((i, runeElm) => {
								const key = $(runeElm).text();
								if (key.includes('Third')) {
									const text = $(runeElm)
										.text()
										.replace('Third', '');
									data.runes.third.push(text);
								} else {
									data.runes.third.push(key);
								}
							});
						}
					});
					resolve(data);
				});
			} catch (err) {
				reject(err);
			}
		});
	}
};
