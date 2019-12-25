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
		const items = [];
		return new Promise((resolve, reject) => {
			request(this.url, (response, err, html) => {
				const $ = cheerio.load(html); //load the html with cheerio module to be able to grab data from the website
				$('.rb-build-off-item-contain').each( // loop through all the divs with the id of (rb-build-off-item-contain)
					 (i, elm) => { 
						const element = $(elm).text(); //get div content
						if (element.includes('Item Build')) { //check if the div content includes (items build)
							$(elm)
								.find('img') //find images from this div
								.each((i, elm) => { //from each image
									items.push($(elm).attr('title')); //get attr of title 
									resolve(items);
								});
						}
					}
				);
			});
		});
	}
};
