var methods = {
	saveDatabase: function(database) {
        // Write the new database to the JSON file.
        var saveJson = JSON.stringify(database, null, 4)
        fs.writeFile('database.json', saveJson, 'utf8', (error) => {
            if (error) {
                console.error(error)
                message.channel.send('There was an error saving the database.')
            }
        });
    },
    
	quickEmbed: function() {
		
    },

    helpCommand: function() {
		
	}
};
exports.functions = methods;