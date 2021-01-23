const owoify = require('owoify-js').default
const Discord = require('discord.js');
module.exports = {
    name: 'owo',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Owoifies a message.',
	execute(message, args, client, database) {

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('OwO Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}owo [message to owoify]`, value: 'OwOifies a message.'},
            )
            message.channel.send(embed);
            return;
          }

        // Owoify the arguments of the message, made into a string
        let owo
        switch (Math.ceil(Math.random()*3)) {
            case 1:
                owo = 'owo'
                break;
            case 2:
                owo = 'uwu'
                break;
            case 3:
                owo = 'uvu'
        }

        message.delete();
        message.channel.send(owoify(args.join(' '), owo))
	},
};
