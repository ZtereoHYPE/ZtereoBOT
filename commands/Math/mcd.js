const path = require('path');
const {MessageEmbed} = require('discord.js');
module.exports = {
	name: 'mcd',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Calculates the maximum commune divisor between two numbers',
	execute(message, args) {
        // TODO: add integer check
        if (parseInt(args[0]) == 0 || parseInt(args[1]) == 0) {
            shortcuts.functions.quickEmbed(message, 'Please use valid numbers (these got parsed as 0).', 'warning');
            return;
        }

        // haha italian terms go brr
        let divisore;
        let dividendo;
        if (args[0] > args[1]) {
            dividendo = parseInt(args[0]);
            divisore = parseInt(args[1]);
        } else if (args[0] < args[1]) {
            divisore = parseInt(args[0]);
            dividendo = parseInt(args[1]);
        } else {
            message.reply(`The mcd bewteen ${args[0]} and itself is... itself.`)
            return;
        }

        let resto;
        const embed = new MessageEmbed()
			.setColor('#009933')
            .setAuthor('ZtereoMATH', 'https://imgur.com/xV5o9Mw.png')
			.setTitle(`MCD between ${dividendo} and ${divisore}`)
        do {
            resto = dividendo % divisore
            // embed.addField(`${dividendo} % ${divisore} = `, `${resto}`)
            if (resto == 0) {
                embed.addField(`RESULT:`, `${divisore}`);
                message.channel.send(embed);
                return;
            }
            nuovoDivisore = dividendo % divisore;
            dividendo = divisore;
            divisore = nuovoDivisore;
        } while (true) // i hate myself
	},
};