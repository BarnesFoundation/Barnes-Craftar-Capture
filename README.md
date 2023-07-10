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


Since the deprecation of CraftAR by Catchoom, this application no longer uses `REACT_APP_` namespaced environment variables, nor environment variables that require rebuilding and redeploying the frontend.