
# Table of Contents

1.  [Node Security Bot](#orgbb39b4f)
    1.  [Get Started](#orgf7c6c0c)
        1.  [Dot ENV File](#orged708e2)
        2.  [Dependencies](#org0643768)
    2.  [Cron Job](#org595857d)
    3.  [Docker](#org14858e0)


<a id="orgbb39b4f"></a>

# Node Security Bot

Node Security Bot is a Discord Bot that send push notifications when a new blog is posted to [httsp://nodejs.org/en/blog](<https://nodejs.org/en/blog>).


<a id="orgf7c6c0c"></a>

## Get Started


<a id="orged708e2"></a>

### Dot ENV File

DO NOT COMMIT/SHARE YOUR .env FILE WITH ANYONE ELSE

You will need to create a .env file to store your Discord Bot API Token and Channel ID Token

`D_TOKEN` - A discord bot API Token to control bot. <br/>
`CHANNEL_ID` - A string of numbers identifying which channel this bot need to send message to.


<a id="org0643768"></a>

### Dependencies

This discord bot require `Node.js` runtime and install dependencies using `npm install`


<a id="org595857d"></a>

## Cron Job

This bot will periodically fetch from node.js blog page. The default time is to fetch every 4 hours.


<a id="org14858e0"></a>

## Docker

Docker Image is WIP

