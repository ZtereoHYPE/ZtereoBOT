const { Hue } = require('hue');
const path = require('path')
const config = require('../../config.json')
module.exports = {
    name: 'hue',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'a commnand used to control ZtereoHYPE\'s hue light bulbs',
    execute(message, args, database, shortcuts) {
        // If the message author isn't ZtereoHYPE, reject
        if (message.author.id != 434842825805266944) {
            message.reply("Only ztereohype can control his hue lights.")
            return;
        }

        // Create a hue constant with my hue hub's login information
        const hue = new Hue(config.hueUser, config.hueToken);

        // On ready, await the lightstrip (5ft light) and if args are off turn it off and if args are on turn it on
        hue.on('ready', async (bridge) => {
            const bedroomLightStrip = await bridge.Light.one(5)
            if (args[0] == 'off') {
                await bedroomLightStrip.off();
                shortcuts.functions.quickEmbed(message, 'Turned off lightstrip.', 'success')
            } else if (args[0] == 'on') {
                await bedroomLightStrip.on();
                shortcuts.functions.quickEmbed(message, 'Turned on lightstrip.', 'success')
            }
        })

        // On error try to reconnect after 5s
        hue.on('error', (msg) => {
            setTimeout(() => {
                hue.connect();
            }, 5 * 1000);
        });
    },
};