# Guide pour FoodKeeper

Installation:

Frontend:

cd web

npm i

Backend:

cd api

npm i

Démarrer: 

Il faut strictement ouvrir l'API en premier.

cd api

node index.js

Ouvrir un deuxième terminal:

cd web

npm start

Quand il demande de changer de port car le port 3000 est déjà pris, faire (y) pour démarrer le serveur React sur le port 3001.

# Comment naviguer?

Client:

S'inscrire et faire les modifications à l'inscription si le site le demande.

Se connecter pour accéder aux pages authentifiées.

Aller sur Liste Restaurants pour voir les choix de restaurants pour réserver ou aller dans profil pour voir les réservations prises.

Lorsqu'on clique un restaurant, on peut cliquer le button réserver.

Dans profil, lorsqu'on clique une réservation, on peut la supprimer ou modifier des informations (notes, commentaires, nombre de personnes, etc)

Restaurateur:

S'inscrire et choisir un nom de restaurant.

Se connecter pour accéder aux pages authentifiées.

On peux voir la liste des restaurants MAIS on ne peut pas réserver (Le but est pour voir comment notre restaurant est affiché.)

Dans profil, on peut changer toutes les informations affichées de notre restaurant (Image, nom, caractéristiques, etc)

Dans cette page, on peut cliquer le bouton 'gérer réservations' pour voir les réservations prises par les clients.

On peut aussi modifier et supprimer les réservations. (Dans le cas où le client a fini afin de libérer des places pour les prochaines personnes, annulation, etc)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
