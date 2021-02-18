const path = require('path')







// change to this https://www.npmjs.com/package/@vitalets/google-translate-api







const translate = require('translate-google')
module.exports = {
	name: 'badtranslate',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Simulate excessive translation with google translate :)',
	execute(message, args) {
        message.react('👍');
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
            let error;
            for (let language of chosenLanguageList) {
                output = await translate(output, {to: language}).catch((err) => {
                    message.reply(`Getting ratelimited by google rn, try again in a few minutes.`)
                    error = err
                })
                if (error) {
                    break
                }
            }

            if (error) {
                return
            }

            await translate(output, {to: 'en'})
                .then((resp) => {
                    output = resp;
                })
                .catch(() => {
                    message.reply(`Getting ratelimited by google rn, try again in a few ***hours***.`)
                    return
                })

            return output;
        }
        
        translateCycle(args.join(' '), 5).then((resp) => {
            message.channel.send(resp)
        })
	},
};