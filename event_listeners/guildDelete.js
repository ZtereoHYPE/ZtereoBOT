const fs = require('fs');
const database = require('../database.json');

module.exports = {
    name: "guildDelete",
    execute(guild) {
        // Log when the bot leaves a guild
        console.log("Left a guild: " + guild.id);

        // Delete the guild's entry in the database
        delete database[guild.id];

        // Save the JSON file
        var saveJson = JSON.stringify(database, null, 4)
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });
    }
}
