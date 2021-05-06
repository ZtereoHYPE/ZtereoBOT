const path = require('path')
module.exports = {
    name: 'mute',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Mute a user.',
    execute(message, args, database, shortcuts) {

        //TODO: ADDD FAILPROOFNESS IF THERE ARE MORE ROLES CALLED THE SAME AND THELL THEM TO DELETE ONE OF THE ROLES. OR SWITCH TO A ROLE ID BUT IT WOULD HAVE TO BE PER-SERVER

        // let muterole be the role named Server Muted
        const muteRole = message.guild.roles.cache.find((role) => role.name === 'Server Muted');

        // if no muterole create one, say it, and cancel
        if (!muteRole) {
            message.guild.roles.create({
                data: {
                    name: "Server Muted",
                    color: "black",
                },
                reason: 'Missing Server Muted role, necessary for mute command.'
            });
            message.channel.send('The `Server Muted` role was created as it was missing. Please run again the command to actually mute the person.');
            return;
        };

        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'mute', '[@member] [time s/m/h/d] [reason]', `Mutes the person in the server.`, database[`${message.guild.id}`]["prefix"], 'Manage Members perms required');
            return;
        }

        // TODO: make this work with a timeout argument and all, currently crashes.
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user to mute.', 'failure');
            return;
        };

        let User = message.guild.members.cache.get(message.mentions.users.first().id)

        // if the author doesnt have perms say it and cancel
        if (!message.guild.members.cache.get(message.author.id).permissions.has('MANAGE_ROLES')) {
            shortcuts.functions.quickEmbed(message, 'You dont have permissions to do that (Manage Roles perms).', 'failure');
            return;
        }

        // iterate over each channel and set the muterole perms to send messages: false
        message.guild.channels.cache.forEach(channel => channel.updateOverwrite(muteRole, { SEND_MESSAGES: false }));

        // shift args to remove name
        args.shift()

        // let rawtime be the next args and say it
        let rawTime = args.shift()

        // if the leftover args dont exist set them to not specified
        if (args.length == 0) args = ['Not', 'specified'];

        //if rawtime has letters
        if (/^[a-zA-Z]+$/.test(rawTime)) {
            // if the person is already muted say it
            if (User.roles.cache.some((role) => role === muteRole)) {
                shortcuts.functions.quickEmbed(message, 'That person is already muted.', 'failure');
                return;
            }

            args.unshift(rawTime)

            if (!Object.keys(database[message.guild.id]['warnings']).includes(User.id)) {
                database[message.guild.id]['warnings'][User.id] = []
            }
            
            database[message.guild.id]['warnings'][User.id].push(
                {
                    "type": "Mute",
                    "date": `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
                    "reason": args.join(' ') + ` (for unlimited time)`
                }
            )

            // save the databases
            shortcuts.functions.saveDatabase(database);

            User.roles.add(muteRole)

            shortcuts.functions.quickEmbed(message, `You muted ${User.user.username} for reason: ${args.join(' ')} (for unlimited time)`, 'success')
            return
        }

        let timeType;
        let computerTime;

        //TODO: add dumb-proof: currelty only checks last character and:
        //
        //      if (lastcharacter == letter) {timetype == lastcharacter && rawTime = rawTime - lastcharacter}
        //      if (lastcharacter == number) {timetype == next word && rawTime stays the same}
        //
        //Should check if rawtime after all of this is an acceptable number and if timetype is one of the recognised time types.

        //TODO: add check if rawTime is a word (multiple letters), in which case add it back to the beginning of args and mute the person indefenetly!

        // check what rawtime is
        if (rawTime.slice(-1).match(/[a-z]/i)) {
            timeType = rawTime.slice(-1)
            rawTime = rawTime.slice(0, -1)

        } else if (rawTime.slice(-1).match(/[0-9]/i)) {
            timeType = args[0]
            args.shift()

        } else {
            shortcuts.functions.quickEmbed(message, `What the heck does ${rawTime} even mean lol. Make sure to not use any special characters, as these are NOT a time.`, 'failure');
            return;
        }

        // check if rawtime isnt made of numbers
        if (isNaN(rawTime)) {
            shortcuts.functions.quickEmbed(message, `\`${rawTime}\` is not an acceptable time!`, 'failure');
            return;
        }

        // check the timetype and set the rawtime accordingly
        switch (timeType) {
            case 's':
                computerTime = rawTime * 1000;
                break;

            case 'm':
                computerTime = rawTime * 60000;
                break;

            case 'h':
                computerTime = rawTime * 3600000;
                break;

            case 'd':
                computerTime = rawTime * 86400000;
                break;

            default:
                shortcuts.functions.quickEmbed(message, `\`${timeType}\` is not an acceptable time type, try with \`s\`, \`m\`, \`h\`, or \`d\`.`, 'failure');
                return;
        }

        //message.channel.send(`mutesd someone for ${computerTime}ms`)
        if (User.roles.cache.some((role) => role === muteRole)) {
            shortcuts.functions.quickEmbed(message, `That person is already muted.`, 'failure');
            return;
        }

        // add the mute role to the person then...
        var date = new Date();
        User.roles.add(muteRole, `Mute command used by ${message.author.username}.`)
            .then(User => {
                
                if (!Object.keys(database[message.guild.id]['warnings']).includes(User.id)) {
                    database[message.guild.id]['warnings'][User.id] = []
                }

                database[message.guild.id]['warnings'][User.id].push(
                    {
                        "type": "Mute",
                        "date": `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
                        "reason": args.join(' ') + ` (for ${rawTime}${timeType})`
                    }
                )

                // save the database
                shortcuts.functions.saveDatabase(database);

                // send success message
                shortcuts.functions.quickEmbed(message, `You muted ${User.user.username} for ${rawTime}${timeType} and for reason: ${args.join(' ')}`, 'success');
            })

        // set timeout for mute time
        setTimeout(function () {
            if (User.roles.cache.some((role) => role === muteRole)) {
                User.roles.remove(muteRole, "Expired mute time set with command.")
            }
        }, computerTime)
    },
};