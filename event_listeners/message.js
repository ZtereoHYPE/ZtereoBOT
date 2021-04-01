const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "message",
    execute(message, client, database, shortcuts) {

        // If made by bot, cancel.
        if (message.author.bot) return;

        // If message comes from DM, say that bot doesn't work in dms *yet*
        if (message.channel.type == 'dm') {
            message.reply('I don\'t work in DMs *yet*.');
            return;
        }

        // // Specific event listener for an internal joke... can be removed
        // let ezArray = [
        //     "Wait... This isn't what I typed!",
        //     "Anyone else really like Rick Astley?",
        //     "Hey moderator, how play game?",
        //     "Sometimes I sing soppy, love songs in the car.",
        //     "I like long walks on the beach and playing Minecraft",
        //     "Please go easy on me, this is my first game!",
        //     "You're a great person! Do you want to play some Multiplayer Minecraft games with me?",
        //     "In my free time I like to watch cat videos on Youtube",
        //     "When I saw the witch with the potion, I knew there was trouble brewing.",
        //     "If the Minecraft world is infinite, how is the sun spinning around it?",
        //     "Hello everyone! I am an innocent player who loves everything Minecraft.",
        //     "Plz give me doggo memes!",
        //     "I heard you like Minecraft, so I built a computer in Minecraft in your Minecraft so you can Minecraft while you Minecraft",
        //     "Why can't the Ender Dragon read a book? Because he always starts at the End.",
        //     "Maybe we can have a rematch?",
        //     "I sometimes try to say bad things then this happens :(",
        //     "Behold, the great and powerful, my magnificent and almighty nemisis!",
        //     "Doin a bamboozle fren.",
        //     "Your clicks per second are godly :O",
        //     "What happens if I add chocolate milk to macaroni and cheese?",
        //     "Can you paint with all the colors of the wind",
        //     "Blue is greener than purple for sure",
        //     "I had something to say, then I forgot it.",
        //     "When nothing is right, go left.",
        //     "I need help, teach me how to play!",
        //     "Your personality shines brighter than the sun.",
        //     "You are very good at the game friend.",
        //     "I like pineapple on my pizza",
        //     "I like pasta, do you prefer nachos?",
        //     "I like Minecraft pvp but you are truly better than me!",
        //     "I have really enjoyed playing with you! <3",
        //     "ILY <3",
        //     "Pineapple doesn't go on pizza!",
        //     "Lets be friends instead of fighting okay?"
        // ]

        // if (message.content.toLowerCase().startsWith("ez")) {
        //     message.delete()
        //     message.channel.send(`${ezArray[Math.floor(Math.random() * ezArray.length)]} \n~${message.guild.member(message.author).user.username}`)
        // }

        // Grab the prefix from the database
        let prefix = database[message.guild.id]["prefix"];

        // Listen to ping and reply with the prefix
        if (message.mentions.users.has(client.user.id) && message.content.trim().split(/ +/).length == 1 && message.type == 'DEFAULT') {
            const embed = new MessageEmbed()
                .setColor('#8EB9FE')
                .setAuthor(`ZtereoBOT information`, 'https://i.imgur.com/dSTYnIF.png')
                .setDescription(`My prefix is \`${prefix}\`. Type \`${prefix}help\` for a list of my commands.`)
            message.reply(embed);
            return
        };

        // If doesn't start with prefix, cancel.
        if (!message.content.startsWith(prefix)) return;

        // Split the message in command and arguments.
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Put the command name into a command const.
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // If the command doesn't exist, cancel.
        if (!command) return;

        // Try to execute the command and in case of failure send error message.
        try {
            command.execute(message, args, database, shortcuts, client);
        } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
                .setColor('#FF1B1B')
                .setTitle('Oopsie woopsie!')
                .setDescription('UwU the bot did a fucky wucky! A little fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!')
                .addField("Error:", `\`\`\`${error}\`\`\``)
                .setFooter('kill me please')
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}