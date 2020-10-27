const Discord = require('discord.js');
module.exports = {
	name: 'rules',
  description: 'Prints the rules',
  args: true,
	execute(message, args) {
    // Check if the argument is help
    if (args[0] == 'help') {
      const embed = new Discord.MessageEmbed()
      .setColor('#00cc00')
      .setTitle('Rules Command:')
      .addFields(
          { name: '=rules **(ZtereoHYPE only)**', value: 'Sends the full list of rules.' },
      )
      message.channel.send(embed);
      return;
    }
    //sends the rules list, only if the author is ZtereoHYPE THIS IS FLAWED AS A PERSON NICKNAMED ZTEREOHYPE COULD EXECUTE but nobody knows shh...
		if (message.author.username === 'ZtereoHYPE') {
      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Server Rules')
        .addFields(
          { name: '1. Follow Discord TOS', value: 'Follow the Terms Of Service of the Discord platform please.' },
          { name: '2. Have some common sense', value: 'Please show some decency and don\'t act on purpose like a fool.' },
          { name: '3. Be respectful to each other', value: 'Again, have some respect for others. Please? :) .' },
          { name: '4. No posts containing homophobia/racism/sexism/nazism', value: 'This is obvious and will not go unpunished.' },
          { name: '5. No NSFW/Pornography', value: 'Like the rule above, this will be severely punished.' },
        )
        .setAuthor('ZtereoBOT', 'https://cdn.discordapp.com/avatars/713718980325539910/01c36f6ac37309befb7b442299f62a19.png?size=128')
        .setFooter('by ZtereoHYPE')
      message.channel.send(embed);

    //if the author is not ZtereoHYPE then report that you don't have permissions
    } else {message.channel.send('Sorry, you don\'t have permissions to use that command.')}
	},
};