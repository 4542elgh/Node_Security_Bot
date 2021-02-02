
# Table of Contents

1.  [Node Security Bot](#org8b2140c)
    1.  [Get Started](#org88348f5)
        1.  [Dot ENV File](#org3d4e47e)
        2.  [Dependencies](#org6306495)
    2.  [Cron Job](#orgb946a69)
    3.  [Docker](#orgd54704e)


<a id="org8b2140c"></a>

# Node Security Bot

Node Security Bot is a Discord Bot that send push notifications when a new blog is posted to [httsp://nodejs.org/en/blog](<https://nodejs.org/en/blog>).


<a id="org88348f5"></a>

## Get Started


<a id="org3d4e47e"></a>

### Dot ENV File

DO NOT COMMIT/SHARE YOUR .env FILE WITH ANYONE ELSE

You will need to create a .env file to store your Discord Bot API Token and Channel ID Token

\`D<sub>TOKEN</sub>\` - A discord bot API Token to control bot. <br/>
\`CHANNEL<sub>ID</sub>\` - A string of numbers identifying which channel this bot need to send message to.


<a id="org6306495"></a>

### Dependencies

This discord bot require `Node.js` runtime and install dependencies using `npm install`


<a id="orgb946a69"></a>

## Cron Job

This bot will periodically fetch from node.js blog page. The default time is to fetch every 4 hours.


<a id="orgd54704e"></a>

## Docker

Docker Image is WIP

