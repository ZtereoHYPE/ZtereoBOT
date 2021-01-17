const { statusType, statusContent } = require('../config.json');
const fs = require('fs');
const shortcuts = require('../shortcuts.js');
module.exports = {
    name: "ready",
    execute(client, database, startDate) {
        // If there is a difference of size between the guilds the bot is currently in and the ones in the database, execute this.
        if (client.guilds.cache.size != Object.keys(database).length) {
            // Make a list of the guilds the bot is currenlty in, and iterate over each guild
            let guildList = []
            for (const guild of client.guilds.cache) {
                guildList.push(guild[0])

                // If the guild is not present in the database, add it using the "guildCreate" event listener
                if (!database[guild[0]]) {
                    client.eventListeners.get('guildCreate').execute(guild[1]);
                }
            }

            // Iterate over each guild in the database
            for (const guild in database) {

                // If the guild of the database is absent from the guilds in the guild list, remove it using the "guildDelete" event listener
                if (!guildList.includes(guild)) {
                    client.eventListeners.get('guildDelete').execute(guild[1]);
                }
            }

            // Write the new database to the JSON file.
            var saveJson = JSON.stringify(database, null, 4)
            fs.writeFile('database.json', saveJson, 'utf8', (error) => {
                if (error) {
                    console.error(error)
                    message.channel.send('There was an error saving the JSON file.')
                }
            });
        }

        // Log ready message in console and set status
        console.log(`Welcome aboard Captain, all systems took ${Date.now() - startDate}ms to get Online!`)
        client.user.setActivity(statusContent, { type: statusType });
    }
}