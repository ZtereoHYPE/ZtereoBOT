const { statusType, statusContent } = require('../config.json');
const fs = require('fs');
module.exports = {
    name: "backOnline",
    execute(client, database) {
        console.log('Welcome aboard Captain, all systems Online!')
        client.user.setActivity(statusContent, { type: statusType });

        if (client.guilds.cache.size != Object.keys(database).length) {
            let guildList = []
            for (const guild of client.guilds.cache) {
                guildList.push(guild[0])

                // If the guild is not present in the database, add it
                if (!database[guild[0]]) {
                    client.extensions.get('join').execute(guild[1]);
                }
            }
            for (const guild in database) {
                if (!guildList.includes(guild)) {
                    client.extensions.get('leave').execute(guild[1]);
                }
            }
            var saveJson = JSON.stringify(database, null, 4)
            fs.writeFile('database.json', saveJson, 'utf8', (error) => {
                if (error) {
                    console.error(error)
                    message.channel.send('There was an error saving the JSON file. The new prefix should work but will reset itself when the bot is restarted.')
                }
            });
        }
    }
}