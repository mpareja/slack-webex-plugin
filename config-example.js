var slackbot = require('./lib/bot');

var config = {
    bot_name: "WebexBot",//Provide the name to post under.  Default is WebexBo
    token: 'XXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXX',
    webex_urls: {
      "launch": "https://mypath.webex.com/meet/",//REPLACE THESE W/ YOUR COMPANY URLs
      "join": "https://mypath.webex.com/join/",
      "DEFAULT": "https://mypath.webex.com/"
    },
    pattern: /^\:webex\s+(personal\s+(\w+))\s*$/, //Default is: /webex personal username
    verbose: true,
    emoji: ":webex:"//NOTE: you'll need to add this emoji

};

//DO NOT EDIT BELOW HERE
var slackbot = new slackbot.Bot(config);
slackbot.run();
