const Discord = require('discord.js');
module.exports = {
    name: 'mute',
    category: 'moderation',
    description: 'Mute a user.',
	execute(message, args, client, database) {

        //TODO: ADDD FAILPROOFNESS IF THERE ARE MORE ROLES CALLED THE SAME AND THELL THEM TO DELETE ONE OF THE ROLES. OR SWITCH TO A ROLE ID BUT IT WOULD HAVE TO BE PER-SERVER

        const muteRole = message.guild.roles.cache.find((role) => role.name === 'Server Muted');

        if (!muteRole) {
            message.guild.roles.create({
                data:{
                    name:"Server Muted",
                    color:"black",
                },
                reason: 'Missing Server Muted role, necessary for mute command.'
            });
            message.channel.send('The `Server Muted` role was created as it was missing. Please run again the command to actually mute the person.');
            return;
        };

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Mute Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}mute [@member] [time s/m/h/d] [reason]`, value: `Mutes the person in the server.` },
                { name: `${database[`${message.guild.id}`]["prefix"]}mute fixPerms`, value: 'Fixes the permissions of the `Server Muted` role' },
            )
            .setFooter(`Manage Members perms required`, 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }
        
        // TODO: make this work with a timeout argument and all, currently crashes.
        const User = message.guild.member(message.mentions.users.first())

        if (!(message.guild.member(message.author).hasPermission('MANAGE_ROLES') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("You dont have permissions to do that (Manage Roles perms).");
            return;
        }

        message.guild.channels.cache.forEach(channel => channel.updateOverwrite(muteRole, { SEND_MESSAGES: false }));
        
        if (args[0]=='fixPerms') {
            message.channel.send("I've tried fixing the permissions.")
            return;
        }
        
        if (!User) {
            message.reply('please specify a user to mute.')
            return;
        };

        if (User.id === message.guild.ownerID) {
            message.reply(`you can\'t mute the server owner lol.`);
            return;
        };

        args.shift()
        let rawTime = args.shift()
        if (args.length == 0) args = ['Not', 'specified'];

        //WHY DOES THIS EXECUTE EVERYTIME EVEN IF IT HAS NUMBERS
        if (/^[a-zA-Z]+$/.test(rawTime)) {
            if (User.roles.cache.some((role)=> role === muteRole)) {
                message.reply('That person is already muted.')
                return;
            }

            args.unshift(rawTime)

            User.roles.add(muteRole)

            message.channel.send(`You muted ${User.user.username} for reason: ${args.join(' ')} (for unlimited time)`)
            return
        }

        let timeType
        let computerTime

        //TODO: add dumb-proof: currelty only checks last character and:
        //
        //      if (lastcharacter == letter) {timetype == lastcharacter && rawTime = rawTime - lastcharacter}
        //      if (lastcharacter == number) {timetype == next word && rawTime stays the same}
        //
        //Should check if rawtime after all of this is an acceptable number and if timetype is one of the recognised time types.

        //TODO: add check if rawTime is a word (multiple letters), in which case add it back to the beginning of args and mute the person indefenetly!

        if (rawTime.slice(-1).match(/[a-z]/i)) {
            timeType = rawTime.slice(-1)
            rawTime = rawTime.slice(0, -1)

        } else if (rawTime.slice(-1).match(/[0-9]/i)) {
            timeType = args[0]
            args.shift()

        } else {
            message.reply(`What the heck does ${rawTime} even mean lol. Make sure to not use any special characters, as these are NOT a time.`)
            return;
        }

        if (/[^0-9]+$/.test(rawTime)) {
            message.reply(`\`${rawTime}\` is not an acceptable time!`);
            return;
        }

        //bitch you better work
        switch (timeType) {
            case 's':
                computerTime = rawTime*1000;
                break;

            case 'm':
                computerTime = rawTime*60000;
                break;

            case 'h':
                computerTime = rawTime*3600000;
                break;

            case 'd':
                computerTime = rawTime*86400000;
                break;

            default:
                message.reply(`\`${timeType}\` is not an acceptable time type, try with \`s\`, \`m\`, \`h\`, or \`d\`.`)
                return;
        }

        //message.channel.send(`mutesd someone for ${computerTime}ms`)
        if (User.roles.cache.some((role)=> role === muteRole)) {
            message.reply('That person is already muted.')
            return;
        }

        User.roles.add(muteRole, "Mute command used.")
        
        setTimeout(function(){
            if (User.roles.cache.some((role)=> role === muteRole)) {
                User.roles.remove(muteRole, "Expired mute time set with command.")
            }
        }, computerTime)

        message.channel.send(`You muted ${User.user.username} for ${rawTime}${timeType} and for reason: ${args.join(' ')}`)
	},
};