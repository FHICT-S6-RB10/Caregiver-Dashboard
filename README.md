# Caregiver-Dashboard
## Port: 3000
This is the dashboard that caregivers use to view patients' stress data.

## Set up local working environment
First you need to install [NPM](https://www.npmjs.com/)

## How to start in Docker
In the project root directory you can run:
```
docker compose up
```
## How to run

Open a CLI in the project root directory and run:
```
npm install
```
This will install all the packages in the node_modules folder.
By default, it will install all modules listed as dependencies in 'package.json'
Then run:
```
npm start
```
This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make changes.\
You may also see any lint errors in the console.

## Extra commands:
Launch the test runner in the interactive watch mode:
```
npm test
```
Build the app for production to the `build` folder:
```
npm run build
```
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!


If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project: \
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
```
npm run eject
```
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
