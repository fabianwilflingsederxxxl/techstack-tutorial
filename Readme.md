# XXXLutz Developer Platform Setup

[![React](/img/react-padded-90.png)](https://facebook.github.io/react/)
[![React Router](/img/react-router-padded-90.png)](https://github.com/ReactTraining/react-router)
[![ESLint](/img/eslint-padded-90.png)](http://eslint.org/)
[![Jest](/img/jest-padded-90.png)](https://facebook.github.io/jest/)
[![Yarn](/img/yarn-padded-90.png)](https://yarnpkg.com/)
[![Webpack](/img/webpack-padded-90.png)](https://webpack.github.io/)

This is a tutorial guide to assemble the Javascript Stack of the internal Developer Platform. It requires general Development understanding with little bit Javascript Knowledge. The idea and Format of this tutorial was influenced by the great verekia, check out [his stack here](https://github.com/verekia/js-stack-from-scratch).

The goal of this tutorial is a quick onboarding of the internal team to understand the concepts of component based architecture and a Javascript stack that relies heavily on ReactJS and Frameworks close to them.

This stack uses mainly libraries, that had an inexpensive last version update and therefor displays a more conservative approach in the techstack setup. In the finished platform we use Redux and Flow for state and type handling, we might add the functionality to this tutorial at some later point.

This tutorial won't use a pre-made configuration, we do deep dives in every technology to make sure everybody knows what is happening. For quick boilerplates rather use the [create-react-app](https://github.com/facebookincubator/create-react-app).

In every chapter you find the code on that particular point and you can run the, with `yarn && yarn start`.

Works on Linux, macOS, and Windows.

> **Note**: If you run into something weird, make sure to check out the [open issues](https://github.com/XXXLutz/techstack-tutorial/issues?q=is%3Aopen+is%3Aissue+label%3Abug) and we are also open for ideas, feature adaptions for this tutorial.


## Table of contents

* [01 - Node, Yarn, and `package.json`](https://github.com/XXXLutz/techstack-tutorial/blob/master/01-node-yarn-package-json/Readme.md)
* [02 - Babel, ES6, ESLint and Husky](https://github.com/XXXLutz/techstack-tutorial/blob/master/02-babel-es6-eslint-husky/Readme.md)
* [03 - Express, Nodemon, and PM2](https://github.com/XXXLutz/techstack-tutorial/blob/master/03-express-nodemon-pm2/Readme.md)
* [04 - Webpack, React, and Hot Module Replacement](https://github.com/XXXLutz/techstack-tutorial/blob/master/04-webpack-react-hmr/Readme.md)
* [05 - Actions and React Router](https://github.com/XXXLutz/techstack-tutorial/blob/master/05-pages-components-react-router/Readme.md)
* [06 - Server-Side Rendering and Helmet](https://github.com/XXXLutz/techstack-tutorial/blob/master/06-ssr-helmet/Readme.md)
* [07 - Bootstrap and CSS Modules](https://github.com/XXXLutz/techstack-tutorial/blob/master/07-component-based-styling/Readme.md)
* [08 - Developers Portal](https://github.com/XXXLutz/techstack-tutorial/blob/master/08-better-styles/Readme.md)
* [09 - Managing Content](https://github.com/XXXLutz/techstack-tutorial/blob/master/09-managing-content/Readme.md)
* [10 - Get Data via Github](https://github.com/XXXLutz/techstack-tutorial/blob/master/10-get-data-via-github/Readme.md)

## Credits

Created by [@truh](https://github.com/truh), [@FabianHippmann](https://github.com/FabianHippmann) and [@flobauer](http://github.com/flobauer) working closely and intensively with [@Uniiq](https://github.com/Uniiq), [@okeanos2](https://github.com/okeanos2), [@tanpes](https://github.com/tanpes), [@ou3](https://github.com/ou3), [@pganser](https://github.com/pganser), [@nl-lsl](https://github.com/nl-lsl), [@pk2xxxlutz](https://github.com/pk2xxxlutz), [@maelu](https://github.com/maelu), [@xxxl-roj](https://github.com/xxxl-roj) and [@xxxl-hmc](https://github.com/xxxl-hmc).

License: MIT