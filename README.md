# characters-of-ice-and-fire

Repository containing Front End code and styles for [`Characters of Ice and Fire`](https://characters-of-ice-and-fire.netlify.app/) web application developed as technical assignment.

Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Table of contents


* [Installing](#installing)
* [Prerequisites](#prerequisites)
* [Available Scripts](#available-scripts)
* [Deployment](#deployment-and-ci)
* [Technologies](#technologies)
* [WIP](#todo)


## Installing

Copy the repository locally run:
```
git clone https://github.com/maja55/characters-of-ice-and-fire.git
```


### Prerequisites

To run the code in this repository you need to have the following installed on your machine:
* [git](https://git-scm.com/)
* [npm & node ](https://nodejs.org/en/)


## Available Scripts

To run the app in the development mode:
```
yarn start
```

Launch test runner in the interactive watch mode:
```
yarn test
```

To build the app for production to the `build` folder
```
yarn build
```


## Deployment and CI

Application is running at https://characters-of-ice-and-fire.netlify.app/

All Pull Requests merged this repository's `master` branch will automatically deploy to Netlify CDN


## Technologies

The tech stack core of the project:
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) - A JavaScript library for typechecking props on react components
* [ReactRouter](https://reactrouter.com/) - A collection of navigational components for Client Side Routing
* [Jest](https://jestjs.io/) - Testing framework
* [TestingLibrary](https://testing-library.com/) - Testing utilities for react components
* [MockServiceWorker](msw) - API mocking library for browser and Node
* [SASS](https://sass-lang.com/) - CSS extension language


## TODO
* Add more tests
* Cache responses on client (local storage) to enable fetch from cache or server
* Add card on mount transition (fade-in or scroll-up)