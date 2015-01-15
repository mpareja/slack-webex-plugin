# Slack Webex Plugin

Webex integration with [slack](http://slack.com).  

It does the following:

1. Produces links, when invoked, to open up your company's Webex page or your Webex personal room

## Usage

```javascript
git clone https://github.com/gsingers/slack-webex-plugin.git
cd slack-webex-plugin
npm install
```

Write your own configuration file (`config-example.js`) is a good starting point for building your own.

```javascript
var slackbot = require('./lib/bot');

var config = {
    bot_name: "WebexBot",//Provide the name to post under.  Default is WebexBo
    token: 'XXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXX',//Get from https://api.slack.com/web#basics
    webex_urls: {
      "launch": "https://mypath.webex.com/meet/",//REPLACE THESE W/ YOUR COMPANY URLs
      "join": "https://mypath.webex.com/join/",
      "DEFAULT": "https://mypath.webex.com/"
    },
    pattern: /^\:webex\s+(personal\s+(\w+))\s*$/, //Default is: /webex personal username
    verbose: true,
    emoji: ":webex:"//NOTE: you'll need to add this emoji or replace it

};

//DO NOT EDIT
var slackbot = new slackbot.Bot(config);
slackbot.run();

```

Save this to a file in the root of the project then run your bot with:

    node your-config-file, eg.: node config-gsingers

This will launch the bot in your terminal based on provided configuration.

## Configuration

- `token`: Your Slack API token, get your token at https://api.slack.com/
- `webex_urls`: A mapping of urls to webex urls.  Usually you just need to replace mypath with your company name or the like
- `pattern`: A JS Regexp that you want to watch for to invoke webex meetings

## TODO:

- Deeper integration w/ the JIRA API
- Optionally restrict to certain config'd channels