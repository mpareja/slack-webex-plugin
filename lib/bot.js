var _ = require('underscore');
var slack = require('./slacker');
var slackbot = require('node-slackbot');
/**
 * Slackbot to integrate JIRA.
 *
 * The main thing it does right now is auto-expand links, but since we are bringing in the JIRA plugin, there is more it can do
 *
 * See config-example.js for configuration
 *
 * To run:  node config-XXX.js   (where XXX is the name of your config
 *
 * See:
 * https://www.npmjs.com/package/node-slackbot
 * https://www.npmjs.com/package/jira
 */
var Bot = function (config) {
  var self = this;
  this.config = _.defaults(config, {
    bot_name: "WebexBot",
    emoji: ":webex:",
    post: true
  });

  this.slacker = new slack.Slacker({ token: this.config.token });
  return this;
};

Bot.prototype.run = function () {
  var self = this;
  var verbose = self.config.verbose;
  var bot = new slackbot(this.config.token);
  bot.use(function (message, cb) {
    if ('message' == message.type && message.text != null && message.subtype != "bot_message") {
      if (verbose) {
        console.log(message);
      }
      var webex = message.text.match(self.config.pattern);

      if (webex && webex.length > 0) {
        var links = "";
        var idx;
        if ((idx = message.text.indexOf("personal")) != -1) {
          var user = message.text.substring((idx + "personal".length) + 1);
          if (user) {
            if (verbose){
              console.log("User: " + user);
            }
            user = user.trim();
            if (user.length > 0) {
              var launch = self.config.webex_urls["launch"];
              var join = self.config.webex_urls["join"];
              links = "Launch:" + launch + user + " Join: " + join + user;
            }
          } else {
            console.log("No user present.  TODO: return an error");
          }
        } else {
          links = self.config.webex_urls["DEFAULT"];
        }

        if (verbose) {//TODO: replace w/ better logging
          console.log(message.user + ' said: ' + message.text);
        }

        self.slacker.send('chat.postMessage', {
          channel: message.channel,
          parse: "full",
          text: "\t" + links,
          username: self.config.bot_name,
          unfurl_links: false,
          link_names: 1,
          icon_emoji: self.config.emoji
        });
      }
    }
    cb();
  });
  bot.connect();
};


exports = module.exports.Bot = Bot;
