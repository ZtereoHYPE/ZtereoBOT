const { MessageEmbed } = require('discord.js');
const request = require("request");
const path = require('path')
module.exports = {
    name: 'inspireme',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'INSPIRE ME FATHER',
    execute(message) {
        request('http://inspirobot.me/api?generate=true', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                msg.channel.send({
                    embed: {
                        color: 3447003,
                        description: "Get INSPIRED motherfucker",
                        image: {
                            url: body
                        }
                    }
                });
            } else {
                var errimage = 'http://inspirobot.me/website/images/inspirobot-dark-green.png';
                msg.channel.send({
                    embed: {
                        color: 3447003,
                        description: "You are UNDESERVING of inspiration",
                        image: {
                            url: errimage
                        }
                    }
                });
            }
        });
    }
}
