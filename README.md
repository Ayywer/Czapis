## Czapis v1.0 ##

Discord Bot made in JavaScript with Node
By Aywer 

## Commands
• Moderation (ban, kick, clear)
• Fully customizable economy
• General, fun commands

## Info

Czapis is simple bot for Discord written in Javascript with Node.js and Discord.js.
If you don't want to pay for databases for economy, this bot is perfect for you!

All data is saved in JSON files (even tho is not the best solution), so be carefull with it. 
Benefits from saving it this way are: 
- fully customizable data
- values easy to edit
- easy to understand for beginners

Events and Handlers are the most important folders in this project. Without it, no commands are gonna work, so make sure they are here. If you want to edit, just make sure you know 
what are you doing.

Handlers are for handling (obviously) commands in folders. 
If you want to make your own command, make sure it's in some folder. 

Events are just events that happens in console or in bot. Client Events are for bot, Creating Events are for creating inside discord.
These are fairly obvious, and easy to edit.

## How to use it?

1.Make sure you have latest Node installed: [here](https://nodejs.org/en)

2.Setup your bot's token and customize your prefix.

3.While at \Czapis folder, enter in console/terminal: node index.js and you good to go!

In theory, this should work fine (thats the way I use).  

## How to customize it?

Well, you NEED to understand javascript and discord.js. If you messd up something, that's on you.
You can add folders for commands as well as new commands. Just follow the main structure of command.

Customize Economy:
  
You can add new values, or change existing ones. Its very simple and beginner friendly.
Economy uses Account system, where every user has it's own account, where bot stores level, exp, money and tokens.
Every customizable command has comments where you can edit stuff. Its really simple and easy to understand, trust me.

## IMPORTANT

First, set up in config.json file prefix of your bot, AND ALWAYS REMEMBER TO NOT SHOW IT OR LEAK IT!!
If you are adding stuff to account system (like new type of currency or something like that), just change
UPDATE value in config.json. That way every person will have it without any problems or editing files!

In events/Creating/messageCreate.js somewhere on bottom there is check if command need an account to work.
Make sure to edit stuff related to account there, not in commands!!

## Final words
You can use this bot as you want, and you don't have to give me credit. I worked a lot to make this code work
and it's still piece of trash. Some code isn't even mine, just changed a little.
When I was started making discord bots in JS, discord.js, I couldn't find a good repo on GitHub to get me started.
So after some work, I made it myself, for people that are in the same situation as I was. 
Glad if I helped you, m8!

If you have any problems - add me on discord: ayywer

Thank you for checking my stuff, Cya ^^

~ Aywer

