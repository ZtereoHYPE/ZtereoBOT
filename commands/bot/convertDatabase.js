const fs = require('fs');
const path = require('path')
const Discord = require('discord.js');
module.exports = {
    name: 'name',
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'description',
	execute(message, args, client, database, shortcuts) {

        // save each key of the json in a variable

        /* iterate over each key:
            - delete bans
            - if enabled has tts, delete enabled and create empty disabled
            - if enabled does not have tts (is empty), create disabled containing tts */
        
	},
};