# ZtereoBOT's Repository!
Welcome to this discord bot repository!
First and foremost, this bot is a sideproject of mine that I am using to learn to use the discord.js library and JavaScript in general.
Next, I work on it whenever I want to and/or have time, so it might not be active for a while and then have a lot of avtivity, that's normal.
Finally, if you want to invite this bot to your server, please contact me here or on discord as I am currently hosting it on a Raspberry Pi zero so yeah, not much power/headroom.


## Licence:
This bot is under the WTFPL licence *(Do What The Fuck You Want To Public License)* so you can literally do, as the name suggests, What The Fuck You Want with the code. It'd be nice if you gave me credit but it's by no means necessary.

oh well


## Instructions to contribute:

If you want to contribute to the project you can either write code blindly, without knowing wether it works or not, or you can clone this bot and run it from your own computer using your own discord application.
For the second option, you need to do some things as this repository does not contain all of necessary files for the bot to work. These things are:

- From inside the bot directory (more specifically, the `package.json` directory) run `npm install` to install all of the reqired dependencies for the bot to work.

- Add a `config.json` file, containing the following:
  ```json
  {
      "token": "xxxxXXXXXXXXXXXXXxxxxxXXXXxxXXXXXxxXXXXXXXXxxxXXXXXxxx",
      "statusType": "LISTENING",
      "statusContent": "-help"
  }
  ```
 
  The Xs will obviously have to be replaced by your own bot token (DO NOT PUBLISH THIS TO THE INTERNETS). statusType can be LISTENING, WATCHING, STREAMING, or PLAYING and statusContent can be whatever you want.
  
  
  
- database.json
  This file contains every server's id along with their prefix and more server-specific information. After the bot has joined a few servers, the file looks a little something like this:
  
  ```json
  {
    "server-id": {
        "prefix": "!",
        "warnings": [player1, player2],
        "rules": ["do not eat", "please"],
	"bans": [],
	"allowed": []
    },
    "server-id2": {
        "prefix": "-",
        "warnings": {},
        "rules": [],
        "bans": {},
        "enable": []
    }
  } 
  ```
  
  Where server-id and server-id2 are the ids of the guilds/servers. Of course you will just need to create an empty json file ( `{}` ) as the bot will create the required entries automagically when it joins or leaves a server. This can for the moment cause issues if something happens while the bot is offline but I have plans to fix that issue.
  
## Thank you!
Thank you for reading this readme and I thank very much all of the past, present, and future contributors of this project :D
