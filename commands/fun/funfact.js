const Discord = require('discord.js');
const https = require('https');
module.exports = {
    name: 'funfact',
    category: 'moderation',
    description: 'Entirely factual information.',
    execute(message, args, client, database) {
        
        let APIList = [
            {
                link:'https://api.chucknorris.io/jokes/random',
                plug:'value'
            }, 
            {
                link:'https://catfact.ninja/fact',
                plug:'fact'
            }
        ]

        var chosenAPI = APIList[Math.floor(Math.random() * APIList.length)];

        https.get(chosenAPI.link, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                    .setTitle('Fun Fact:')
                    .setDescription(JSON.parse(data)[chosenAPI.plug])
                    .setFooter('It\'s true!')
                    .setTimestamp()
                message.channel.send(embed);
            });

        }).on("error", (err) => {
            const embed = new Discord.MessageEmbed()
                .setColor('red')
                .setTitle('Fun Fact:')
                .setDescription('There an an error retrieving the data!')
                .setFooter('It\'s actually true!')
                .setTimestamp()
            message.channel.send(embed);
        });
    }
}