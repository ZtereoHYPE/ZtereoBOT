const {MessageEmbed} = require('discord.js');
const https = require('https');
const path = require('path')
module.exports = {
    name: 'github',
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Get a GitHub user\'s basic information',
	execute(message, args, database, shortcuts) {
        if (!args.length) {
            shortcuts.functions.helpCommand(message, 'github', '[github username]', 'Get a GitHub user\'s basic information.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // let the username be the first args
        let username = args[0]

        // save in options the link with the username
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}`,
            headers: { 'User-Agent': 'Mozilla/5.0' }
          };

        // send an https get request with the options
        https.get(options, (resp) => {
            let data = '';

            // add each chunk of data to data
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // when the response is over make an embed with the information and send it
            resp.on('end', () => {
                let parsedData = JSON.parse(data)
                
                // if the user is invalid send a message
                if (parsedData.message) {
                    shortcuts.functions.quickEmbed(message, 'That\'s not a valid GitHub username.', 'failure');
                    return;
                }
                
                // create the embed
                const embed = new MessageEmbed()
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
                
                // send the embed
                message.channel.send(embed);
            });

        // in case of error log it
        }).on("error", (err) => {
            console.error(err)
        });
	},
};