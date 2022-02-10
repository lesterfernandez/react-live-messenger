# react-live-messenger
## Description
A real-time chat web app where users can log in, add friends and communicate with them in real time.
This application was built publicly with the entire build process avaiable on YouTube in tutorial formats.

[YouTube Playist](https://www.youtube.com/playlist?list=PLBieMfwfePY-PPxTYmYZteqYpC_D7W1JT)

## How it works
* Front-End: React.js
* Back-End: Node.js / Express.js / Socket.io
* Authenticaion: JWT
* Database: PostgreSQL and Redis
* Hosting: Digital Ocean Linux Server with NGINX and SSL

## What I Learned
Through the creation of this project I learned how to do handle real-time communication between clients by using a dedicated server as the intermediator. 

I learned how to use JWT to do authentication as all my previous projects had used cookies. I also learned the basics of NGINX to configure an SSL certificate. 

Most of my growth from this project came from the back-end implementations as I am already familiar with front-end technology. 

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
