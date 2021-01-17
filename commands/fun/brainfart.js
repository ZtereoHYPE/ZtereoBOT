module.exports = {
	name: 'brainfart',
	description: 'send this when someone made a brainfart',
	execute(message) {
		message.delete()
        message.channel.send('looks like someone made a brainfart')
	},
};