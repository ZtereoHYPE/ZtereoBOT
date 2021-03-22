const path = require('path')
module.exports = {
    name: 'eval',
    aliases: ['execute'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Eval command, to exectue whatever ZtereoHYPE wants. DO NOT USE UNLESS BOT OWNER',
    execute(message, args) {
        // Create an array of allowed IDs
        let allowedArray = [
            '434842825805266944',
            '547767393724792844'
        ]

        // If the id isn't in the allowed array, return.
        if (!allowedArray.includes(message.author.id)) {
            message.reply("You are not allowed to use this command.");
            return;
        }

        // Clean constant to restrain from pinging
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        // Try to evaluate and execute the code
        try {
            // Execute and save the result in evaled
            let evaled = eval(args.join(" "));

            // If evaled isn't a string replaced it with an inspectored version of it
            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled);
            }

            // Clean eval and send it
            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            // If there is an error, clean it and send it.
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};