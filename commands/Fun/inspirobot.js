const { MessageEmbed } = require('discord.js');
const https = require('https');
const path = require('path')
module.exports = {
    name: 'inspirobot',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Generates and fetches an InspiroBot quote.',
    execute(message) {
        https.get('https://inspirobot.me/api?generate=true', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const embed = new MessageEmbed()
                    .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
                    .setImage(data)
                    .setFooter('Truly inspirational')
                    .setTimestamp()
                message.channel.send(embed);

            }).on("error", (err) => {
                const embed = new MessageEmbed()
                .setColor('#FF1B1B')
                .setTitle('Oopsie woopsie!')
                .setDescription('UwU the bot did a fucky wucky! A little fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!')
                .addField("Error:", `\`\`\`${err}\`\`\``)
                .setFooter('kill me please')
                .setTimestamp()
            message.channel.send(embed);
            });
        })
    }
}