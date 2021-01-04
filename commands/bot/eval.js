const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: 'eval',
    category: 'bot',
    description: 'Eval command, to exectue whatever ZtereoHYPE wants. DO NOT USE UNLESS BOT OWNER',
    execute(message, args, client, database) {

        if (message.guild.member(message.author).id != 434842825805266944) {
            message.reply("OI! THIS IS A HIGLY DANGEROUS COMMAND RIGHT HERE AND YOU AINT ZTEREOHYPE SO GO AWAY BEFORE I CALL THE COPS")
            return;
        }

        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            let evaled = eval(args.join(" "));

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled)
            }
            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};

