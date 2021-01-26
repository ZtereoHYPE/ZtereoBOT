const fs = require('fs');
const path = require('path')
const Discord = require('discord.js');
module.exports = {
    name: 'convertdatabase',
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'convert the Database',
	execute(message, args, client, database, shortcuts) {

        message.channel.send("i've started converting the database")
        // save each key of the json in a variable
        Object.keys(database).forEach(key => {
            delete database[key]["bans"];

            /* iterate over each key:
            - delete bans
            - if enable has tts, delete enabled and create empty disabled
            - if enable does not have tts (is empty), create disabled containing tts */
            if (database[key]["enable"].includes("tts")) {
                delete database[key]["enable"];
                database[key]["disabled"] = [];
            } else {
                delete database[key]["enable"];
                database[key]["disabled"] = ["tts"];
            }
        });
        shortcuts.functions.saveDatabase(database)
        message.channel.send("i've tried converting the database")
	},
};