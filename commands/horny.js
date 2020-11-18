module.exports = {
    name: 'horny',
    description: 'Tells you whether Ztereo is horny today or not.',
    execute(message) {
        // Retrieves Ztereo from the guild.
        const ztereo = message.guild.members.cache.get('434842825805266944');

        // An array of statuses a member can have.
        const statuses = [
            'online',
            'idle',
            'dnd'
        ];

        // Checks if Ztereo is online.
        if (statuses.includes(ztereo.presence.status)) {
            message.reply('Ztereo is indeed horny at the moment!');
        } else {
            message.reply('Ztereo is currently not horny.');
        }
    },
};