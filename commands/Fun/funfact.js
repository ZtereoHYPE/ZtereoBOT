const { MessageEmbed } = require('discord.js');
const https = require('https');
const path = require('path')
module.exports = {
    name: 'funfact',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Entirely factual information.',
    execute(message) {
        // let the list of used APIs be this
        let APIList = [
            {
                link: 'https://api.chucknorris.io/jokes/random',
                plug: 'value'
            },
            {
                link: 'https://catfact.ninja/fact',
                plug: 'fact'
            }
        ]

        // Choose an API at random
        var chosenAPI = APIList[Math.floor(Math.random() * APIList.length)];

        // Send a get request to the chosen API and fill embeds according to the response
        https.get(chosenAPI.link, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const embed = new MessageEmbed()
                    .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle('Fun Fact:')
                    .setDescription(JSON.parse(data)[chosenAPI.plug])
                    .setFooter('It\'s true!')
                    .setTimestamp()
                message.channel.send(embed);
            });

        }).on("error", (err) => {
            const embed = new MessageEmbed()
                .setColor('red')
                .setTitle('Fun Fact:')
                .setDescription(`There was an error retrieving the data! \n \`${err}\``)
                .setFooter('It\'s actually true!')
                .setTimestamp()
            message.channel.send(embed);
        });
    }
}