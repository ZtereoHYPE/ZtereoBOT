const path = require('path')
const translate = require('@vitalets/google-translate-api');
module.exports = {
	name: 'badtranslate',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Simulate excessive translation with google translate :)',
	execute(message, args, database, shortcuts) {
        // If there are no arguments say it and abort.
        if (args.length == 0) {
            shortcuts.functions.quickEmbed(message, 'Please type a sentence to badly translate.', 'failure');
            return;
        }

        // React to the message to show progress is being made
        message.react('👍');

        // Make a list of all available languages and remove from it some unrelated elements
        let languageList = Object.keys(translate.languages)
        languageList.splice(languageList.indexOf('auto'), 1).splice(languageList.indexOf('isSupported'), 1).splice(languageList.indexOf('getCode'), 1)

        // Make an async function for the translate cycle
        async function translateCycle(input, cyclesNumber) {
            // Make an array for chosen languages
            let chosenLanguageList = [];

            // Add as many random languages to the list as the cycles number
            for (i = 0; i < cyclesNumber; i++) {
                chosenLanguage = languageList[Math.floor(Math.random() * languageList.length)];
                if (!chosenLanguageList.includes(chosenLanguage)) chosenLanguageList.push(chosenLanguage);
            }

            // Set output to be the input
            output = input;

            // Iterate over every language, setting the output to be the translation of itself
            for (let language of chosenLanguageList) {
                output = await translate(output, {to: language});
                output = output.text;
            }

            // Translate one final time back to english
            await translate(output, {to: 'en'})
                .then((resp) => {
                    output = resp.text;
                })

            // Return the output
            return output;
        }
        
        // Call that function and then send the result in the message's channel
        translateCycle(args.join(' '), 5).then((resp) => {
            message.channel.send(resp)
        })
	},
};