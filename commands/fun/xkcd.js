const { MessageEmbed } = require('discord.js');
const https = require('https');
const path = require('path')
module.exports = {
    name: 'xkcd',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Only the best comics.',
    execute(message) {
        let xkcdAPI = {
            link: 'https://xkcd.com',
        }
        https.get(xkcd.link, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const embed = new MessageEmbed()
                    .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle(JSON.parse(data)["safe_title"])
                    .setDescription(JSON.parse(data)['img'])
                    .setFooter(JSON.parse(data)['month'] + "/" + JSON.parse(data)['day'] + "/" + JSON.parse(data)['year'])
                    .setTimestamp()
                message.channel.send(embed);
            });
            
        }).on("error", (err) => {
            const embed = new MessageEmbed()
                .setColor('red')
                .setTitle('Oopsie woopsie!')
                .setDescription('UwU the bot did a fucky wucky! A little fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!')
                .setFooter('kill me please')
                .setTimestamp()
            message.channel.send(embed);
        });
    }
}
