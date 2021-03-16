const path = require('path')
module.exports = {
    name: 'unban',
    aliases: ['pardon'],
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Unbans a player from the guild.',
	execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'unban', '[member id]', 'Unbans a player from the guild.', database[`${message.guild.id}`]["prefix"], 'Ban members perms required');
            return;
        };

        // if the member doesn't have permissions, say it and cancel
        if (!(message.guild.member(message.author).hasPermission('BAN_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            shortcuts.functions.quickEmbed(message, `You don\'t have the permission to do that (Ban Members perms).`, 'failure');
            return;
        }

        // check if the ID given is a number
        if (!(/[0-9]+$/.test(args[0]))) {
            shortcuts.functions.quickEmbed(message, `Please give select a user by its ID. To find the ID, use \`${database[`${message.guild.id}`]["prefix"]}banlist\``, 'failure');
            return;
        };
        
        // ban the member and then send success message
        message.guild.members.unban(args[0])
            .then(user => shortcuts.functions.quickEmbed(message, `You unbanned ${user.username} from ${message.guild.name}.`, 'success'))
	},
};