const Discord = require('discord.js');
const https = require('https');
module.exports = {
    name: 'funfact',
    category: 'moderation',
    description: 'Entirely factual information.',
    execute(message, args, client, database) {
        
        https.get('https://api.chucknorris.io/jokes/random', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#00cc00')
                    .setTitle('Fun Fact:')
                    .setDescription(JSON.parse(data).value)
                    .setFooter('It\'s true!')
                    .setTimestamp()
                message.channel.send(embed);
            });

        }).on("error", (err) => {
            const embed = new Discord.MessageEmbed()
                .setColor('#00cc00')
                .setTitle('Fun Fact:')
                .setDescription('There an an error retrieving the data!')
                .setFooter('It\'s true!')
                .setTimestamp()
            message.channel.send(embed);
        });
    }
}