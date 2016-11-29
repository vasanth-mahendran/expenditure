# Expenditure

This is the academic project to showcase the Architecture of client,server application with the help of java script. This project is deployed in heroku.Application consumes a REST API which reponds with expenditure details of group of friends who spent a vacation together and represents the data in different model like table,charts,maps etc using open source frameworks and plugins.

## Phase 1

## Client Framework - React

I have used React Framework as client framework for my project.Since React provides re-usablity at the highest level.React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Server Framework - Node

I have used Node JS with Express as a Server Framework.Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It also provides a way to include static assets to the application with minimal code.

## Things i found hard

I found implementing google maps is difficult, since React dependency for google map is not stable and there were lot of open issues for most of the dependendies for react google maps.

## Things i found easy

I found implementing carousel,table,charts were easy,as dependencies took care of everything. simply adding them with data injected,it works like charm.Since Bootstrap provides rebuilt framework for React, Most of the components are easy to write with Bootstrap.

## Dependencies installed

react-gmaps : For including Google maps
react-chartjs-2 : For including charts
react-bootstrap-table : For including table
react-bootstrap : For including carousel and other bootstrap components
express : wrapper for app
babel : for bundling the javascript into single bundle.js

## Commands used for deployment and starting the application

npm run build - to build the applciation i.e bundling the java script files and installing npm modules
npm run start - to start the applicaiton in the node server

## Phase 2

## Database - NoSQL(MongoDB)

MongoDB manages unstructured data. We dont need to come up with schema to create a database. Easy to use and learn. It bootstrap the development which is needed especially for academic projects.

## Things i found easy

Node provides add-ons including drivers for mongo DB which faciliates querying the mongoDB for data. Changes required for adding mongo DB drivers are pluggable with very minimal custom changes. Node even has add-on for implementing pagination in data which was very usefull to me in completing the task quickly.

## Things i found hard

I have used React as the front end framework for my website. Even though React provides so many dependencies which helps bootstrapping the development, implementing animation in react component is bit difficult since documentatin for that is unclear and there are very few examples for the same

## Concerns using these in professional environment

if you are dealing with structured and transactional data where accuracy of the data is more important than the performance like bank database, NoSQL would be no use. since NoSQL gives importance to scalability and performance than the accuracy of the data. Such data demands the traditional Relational model like SQL.
