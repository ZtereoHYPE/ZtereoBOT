module.exports = {
	name: 'brainfart',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'send this when someone made a brainfart',
	execute(message) {
		message.delete()
        message.channel.send('looks like someone made a brainfart')
	},
};