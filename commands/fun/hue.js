const { Hue } = require('hue');
const https = require('https');
module.exports = {
    name: 'hue',
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'a commnand used to control ZtereoHYPE\'s hue light bulbs',
	execute(message, args, client, database) {
        const hue = new Hue('ecb5fafffe1a9fac', '-Louw4QvRiDCeB2wSjVDV2sQXGfqZgQphVb35ZYt');

        hue.on('ready', async (bridge) => {
            const bedroomLightStrip = await bridge.Light.one(5)
            if (args[0] == 'off') {
                await bedroomLightStrip.off();
                message.reply('turned off lightstrip')
            } else if (args[0] == 'on') {
                await bedroomLightStrip.on();
                message.reply('turned on lightstrip')
            }
            
        })

        hue.on('error', (msg) => {
            setTimeout(() => {
                hue.connect();
            }, 30*1000);
        });
	},
};