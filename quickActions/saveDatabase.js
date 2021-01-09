//cursed please fix

module.exports = {
    name: "saveDatabase",
    execute(database) {
        var saveJson = JSON.stringify(database, null, 4);
        fs.writeFile('database.json', saveJson, 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        });
    }
}