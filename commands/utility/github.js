const Discord = require('discord.js');
const https = require('https');
module.exports = {
    name: 'github',
    category: 'utility',
	description: 'A test command to play with APIs',
	execute(message, args) {
        let username = args[0]
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}`,
            headers: { 'User-Agent': 'Mozilla/5.0' }
          };

        https.get(options, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                let parsedData = JSON.parse(data)
                if (parsedData.message) {
                    message.reply('That\'s not a valid GitHub username')
                    return;
                }
                const embed = new Discord.MessageEmbed()
                    .setColor('#96bbe9')
                    .setAuthor(`${username}'s GitHub profile:`, parsedData.avatar_url, parsedData.html_url)
                    .addFields(
                        {name:'Bio:', value:parsedData.bio},
                        {name:'Location:', value:parsedData.location},
                        {name:`Public Repos:`, value:parsedData.public_repos},
                        {name:'Public Gists:', value:parsedData.public_gists},
                        {name:'Followers:', value:parsedData.followers, inline:true},
                        {name:'Following:', value:parsedData.following, inline:true}
                    )
                    .setFooter('Tip: Click on the title to go to the user\'s profile page!')
                    .setTimestamp()
                message.channel.send(embed);
            });

        }).on("error", (err) => {
            console.log(err)
        });
	},
};