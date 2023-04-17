# react-live-messenger

## Description

A real-time chat web app where users can log in, add friends and communicate with them in real time.
This application was built publicly with the entire build process avaiable on YouTube in a tutorial format.

[YouTube Playist](https://www.youtube.com/playlist?list=PLBieMfwfePY-PPxTYmYZteqYpC_D7W1JT)

## Project Structure

- client - React.js Frontend
- server - Node.js Backend
- common - code shared between client and server

## How it works

- Front-End: React.js
- Back-End: Node.js / Express.js / Socket.io
- Authenticaion: JWT
- Database: PostgreSQL and Redis

## Running the Project

- Clone the repository
- CD into the repository and run `yarn`
- Have a Redis instance listening on `localhost:6379` OR define an env variable named `REDIS_URL`
- Have a PostreSQL db running and provide either `DATABASE_URL` as an environment variable, or provide the following:
  <br/>`DATABASE_NAME`
  <br/>`DATABASE_HOST`
  <br/>`DATABASE_USER`
  <br/>`DATABASE_PASSWORD`
  <br/>`DATABASE_PORT`
  <br/>`COOKIE_SECRET`
- Initialize the database with the queries found in `packages/server/database.sql`
- Note: all environment variables must be defined in a file named `.env`
- Run `yarn dev:server` and `yarn dev:client`
