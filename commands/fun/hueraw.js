const path = require('path')
const https = require('https');
var rootCas = require('ssl-root-cas').create();
require('https').globalAgent.options.ca = rootCas;
module.exports = {
    name: 'hueraw',
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'a commnand used to control ZtereoHYPE\'s hue light bulbs that uses the raw api',
	execute(message, args, client, database) {

        if (message.guild.member(message.author).id != 434842825805266944) {
            message.reply("Bruh only ztereohype can control his hue lights.")
            return;
        }

        const options = {
            hostname: '192.168.10.41',
            port: 443,
            path: '/api/-Louw4QvRiDCeB2wSjVDV2sQXGfqZgQphVb35ZYt/lights',
            method: 'GET'
        }
        
        https.request(options, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            resp.on('end', () => {
                console.log(data)
            });
        }).on("error", (err) => console.log(err))
	},
};