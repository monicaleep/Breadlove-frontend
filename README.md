# Bread the Love FRONTEND

Screenshot of landing page

link to deployed frontend app

#### Find the backend [here](https://github.com/monicaleep/breadlove-backend)

[wireframes](https://www.figma.com/file/YZA1vsJCFKHEgMNqf9lvzS/Bread-The-Love?node-id=1%3A5649)

#### user stories
- As a user, I want to be able to login/Signup
- As a user, I want to be able to upload a picture of my baked goods
- As a user, I want to be able to add a name and description for my baked good
- As a user, i want to be able to leave comments on other people's baked goods
- As a user, I want to be able to delete any of my baked goods
- As a user, I want to be able to edit the details of my baked good
- As a user, I want to be able to delete my account

### frontend tech used
- React, React-Router, Formik, Yup, axios, cloudinary, material-ui

### general approach (a couple paragraphs)
Bread the Love was born out of the quarantine baking fad of 2020. It is an app for users to sign up and share their creations with the world. Other users can add comments and feedback to creations. This app is served via a backend API and made using React. The frontend uses JWT authentication, Material UI components, and Formik/Yup for form validation.

### installation instructions
1. Fork and clone the repo
2. `npm i`
3. Set environment variable for the backend in the .env files
4. `npm start`


### unsolved problems / major hurdles
- next step to add typescript to the project
- add the ability for multiple pictures for a single baked good, to get different angles
- longer term I'd like to add real time messaging between users OR some ecommerce like Stripe
