const path = require('path')
const translate = require('translate-google')
module.exports = {
	name: 'badtranslate',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Simulate excessive translation with google translate :)',
	execute(message, args) {
        let languageList = Object.keys(translate.languages)
        languageList.splice(languageList.indexOf('auto'), 1)
        languageList.splice(languageList.indexOf('isSupported'), 1)
        languageList.splice(languageList.indexOf('getCode'), 1)

        async function translateCycle(input, cyclesNumber) {
            let chosenLanguageList = [];

            for (i = 0; i < cyclesNumber; i++) {
                chosenLanguage = languageList[Math.floor(Math.random() * languageList.length)];
                if (!chosenLanguageList.includes(chosenLanguage)) chosenLanguageList.push(chosenLanguage);
            }

            output = input;
            for (let language of chosenLanguageList) {
                output = await translate(output, {to: language})
            }

            await translate(output, {to: 'en'}).then((resp) => {
                output = resp;
            })

            return output;
        }
        
        translateCycle(args.join(' '), 5).then((resp) => {
            message.channel.send(resp)
        })
	},
};