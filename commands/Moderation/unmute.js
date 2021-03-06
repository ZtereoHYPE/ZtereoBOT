const Discord = require('discord.js');
const path = require('path')
module.exports = {
    name: 'unmute',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Unmute a user.',
	execute(message, args, database, shortcuts) {

        //TODO: ADDD FAILPROOFNESS IF THERE ARE MORE ROLES CALLED THE SAME AND THELL THEM TO DELETE ONE OF THE ROLES. OR SWITCH TO A ROLE ID BUT IT WOULD HAVE TO BE PER-SERVER

        // let muterole be the muted role
        const muteRole = message.guild.roles.cache.find((role) => role.name === 'Server Muted');

        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'unmute', '[@member] <reason>', 'Unmutes the person in the server.', database[`${message.guild.id}`]["prefix"], 'Manage Member perms required');
            return;
        }
        
        // TODO: make this work with a timeout argument and all, currently crashes.
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user to unmute.', 'failure');
            return;
        };
        let User = message.guild.members.cache.get(message.mentions.users.first().id)

        // if the member doesn't have permissions, say it and cancel
        if (!message.guild.members.cache.get(message.author.id).permissions.has('MANAGE_ROLES')) {
            shortcuts.functions.quickEmbed(message, "You dont have permissions to do that (Manage Roles perms).", 'failure');
            return;
        }

        // if the message doesn't specify a user, say it and cancel

        // if the user does not have the muted role, say it and cancel
        if (!User.roles.cache.some((role)=> role === muteRole)) {
            shortcuts.functions.quickEmbed(message, 'That person is not muted.', 'failure');
            return;
        }

        // if the server owner is muted, say what the fuck happened here
        if (User.id === message.guild.ownerID) {
            message.channel.send(`wtf happened here.`);
        };

        // remove the ping from the args and if there are none left set them to not specified
        args.shift()
        if (args.length == 0) args = ['Not', 'specified'];

        // remove the role from the person, then send the success message
        User.roles.remove(muteRole, "Unmute command used.")
            .then(() => shortcuts.functions.quickEmbed(message, `You unmuted ${User.user.username}.`, 'success'))
	},
};