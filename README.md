# Barnes Craftar Capture
This project is a mobile application designed for capturing multiple vantage points for additional reference images to upload into the Barnes Foundation image repository in Catchoom. 

## Development

This repository contains both the server code and frontend code that the application uses. You can clone it locally.

On the frontend, it uses
- React Typescript (created by Create React App -- Typescript)
- React/Redux (state management)
- Material UI for component styling
- SCSS for styling logic

The backend is just an Express server written in Typescript that serves the `build` folder compiled by the React frontend.

To develop the frontend locally, just use the command `npm start`. This will start the local development server for React. It will auto-recompile upon any changes done in the `src` folder so you can see your frontend changes in real-time during development.

For developing with the backend, you can use the command `npm run serve`. This will compile all the files within the `server` folder and produce the output into the `dist` folder. Once that's done, that output is executed.

## Deployment

There isn't automated deployment configured yet for the application. You can follow these steps to deploy the application wherever you want.

1. Perform a `git clone` on this repository
2. Run `npm install --production` to install all dependences (this will exclude any development dependencies)
3. Run `npm build` to build the frontend code into the `build` folder
4. Run `npm run serve` to compile and run the server, which serves the contents of the `build` folder

### Environment Variables

You must set the following three variables in the `.env` if they ever change from their currently set values


- `REACT_APP_MANAGEMENT_API_KEY` - The API Key provides you with authentication for Catchoom's [Management API](https://documentation.catchoom.com/documentation/management-api/). You can retrieve it from the [Craftar Website](https://my.craftar.net/) > Developer Portal > Management API Key

- `REACT_APP_COLLECTION_UUID` - This is the UUID identifying the collection in Catchoom that you would like to add the additional reference images into. You can retrieve it by going to the [Craftar Website](https://my.craftar.net/) > Collections > [ Collection ] > URL address. It's the long string following 'https://my.craftar.net/collections/'.

- `REACT_APP_COLLECTION_TOKEN` - This is the token that provides you access to Catchoom's [Image Recognition API](https://documentation.catchoom.com/documentation/image-recognition-api/). You grab the token from the collection that you want to perform image recognition against and the value is different from one collection to another.

These values are already configured and working in the current `.env` file, but in case any of the above ever changes, you'll need to be update the `.env` and redeploy the application, including rebuilding the frontend directory.

