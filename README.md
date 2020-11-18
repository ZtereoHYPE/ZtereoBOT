# ZtereoBOT's Repository!

## Instructions to contribute:
This repository does not contain all of necessary files to work.
If you want to contribute to the project you will need to add exactly 2 files to the root directory (aka folder) of this project:

- config.json:
  A json file containing the token of the bot (under a "token" key) for it to work. In this case you will either have to set up your own testing token specific to the testing of your branch, or ask me to test the stuff by simply pull-requesting your changes. For testing purposes, it looks like this:
  
  {
	"token": "the_actual_token"
  }
  
  
- database.json
  This file contains every server's id along with their prefix and more server-specific information. It looks a little something like this:
  
  {
    "server-id": {
        "prefix": "!",
        "warnings": [player1, player2],
        "rules": ["do not eat", "please"]
    },
    "server-id2": {
        "prefix": "=",
        "warnings": [],
        "rules": ["rule 1", "rule 2"]
    }
  }
  
  Where server-id and server-id2 are the ids of the guilds/servers.
  
## Current contributors:
Current contributors to the project are:
- ZtereoHYPE (me)
- MrGlockenspiel (owo command)
- Eastah (horny command)
