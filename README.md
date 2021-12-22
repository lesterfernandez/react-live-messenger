# fullstack-whatsapp-clone
A full-stack real-time chat application, similar to whatsapp.

This application was made as part of a youtube series.

## How it was made:
https://www.youtube.com/playlist?list=PLBieMfwfePY-PPxTYmYZteqYpC_D7W1JT

## How to run locally
* Git clone the repository
* Cd into the repository and run ```yarn```
* Make sure redis is installed and the ```redis-cli``` command can be run
* Create a postgres database and create a table called users, as defined in ```./packages/server/database.sql```
* Create a file named ```.env``` in ```./packages/server``` and make sure it has the following variables defined:
<br/>DATABASE_NAME=
<br/>DATABASE_HOST=
<br/>DATABASE_USER=
<br/>DATABASE_PASSWORD=
<br/>DATABASE_PORT=
<br/>COOKIE_SECRET=
* Run ```yarn server``` and ```yarn client```
