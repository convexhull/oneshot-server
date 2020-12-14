# Indian colleges stats backend (With fake data)

This Express project was bootstrapped with [express-generator](https://github.com/facebook/create-react-app)


## Requirements
* Mongodb running on an accessible port. Default 27017 is fine.

## Environment
* Cretae a .env file in the project directory with following content
```
PORT=<port on which you want this service to run>
MONGODB_URI=<mongodb uri>
```

## Installation and set-up

In the project directory run:

* ### `yarn install`
* ### `node utils/mockDb.js`
* ### `yarn start`

Here the second command is for indexing fake data into db
This will run the app on the PORT as mentioned in .env

### `yarn dev`

Launches the app in development watch mode.

