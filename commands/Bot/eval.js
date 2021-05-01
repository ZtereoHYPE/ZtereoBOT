const path = require('path')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'eval',
    aliases: ['execute'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Eval command, to exectue whatever ZtereoHYPE wants. DO NOT USE UNLESS BOT OWNER',
    execute(message, args) {
        // Create an array of allowed IDs
        let allowedArray = [
            '434842825805266944',
            '547767393724792844',
            '341383949462798337'
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

        var input = args.join(" ");
        var output;

        var error = false;

        // Try to evaluate and execute the code
        try {
            // Execute and save the result in output
            output = eval(input);

            // If output isn't a string replaced it with an inspectored version of it
            if (typeof output !== "string") {
                output = require("util").inspect(output);
            }
        } catch (err) {
            output = err;
            error = true;
        } finally {
            const embed = new MessageEmbed()
                .setColor('#8EB9FE')
                .setColor(!error ? "#00ff00" : "ff0000")
                .setTitle(!error ? "Success" : "Failure")
                .addFields(
                    { name: "Input", value: `\`\`\`${input}\`\`\``, inline: false },
                    { name: "Output", value: `\`\`\`${output}\`\`\``, inline: false }
                )
                .setTimestamp()

            message.channel.send(embed);
        }

    },
};
