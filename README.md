# Hikeroo - A gateway to a community of adventurers

Hikeroo is a web application designed to connect hiking enthusiasts from around the world. Its purpose is to provide a platform where users can create and join hike groups, plan and discuss hikes, and find hike groups worldwide. With Hikeroo, hikers can connect with like-minded individuals and explore new hiking destinations together.

## Installation

Clone the github repository.

```bash
git clone 'https://github.com/Zennoon/hikeroo'
```

## Usage
Make sure you have MongoDB installed

Go into the hikeroo directory
```bash
cd hikeroo/
```
Install dependencies
```bash
npm install
```
start the back-end express app, and provide a secret for JWT authentication
```bash
cd backend/
SECRET="YOUR SECRET" npm run dev src/app.js
```
In another terminal, start the front-end next application
```bash
cd frontend/
npm run dev
```

## Technologies
### Back-end
NodeJS (Express)\
JWT for authentication\
MongoDB database\
Mongoose ODM
### Front-end
NextJS\
React\
Tailwind\
Shadcn-ui Component library

## Contributing

You are more than welcome, and appreciated to contribute to this project. Don't hesitate to make a PR.

## License

[MIT](https://choosealicense.com/licenses/mit/)
