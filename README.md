# Proplite_All_APi

Property Pro Lite is a platform where people can create and/or search properties for sale or rent. 

# Pivotal track stories link
https://www.pivotaltracker.com/n/projects/2359004

# travis
[![Coverage Status](https://coveralls.io/repos/github/Kagorora/Proplite_All_APi/badge.svg?branch=bg-resolve-travis-167246647)](https://coveralls.io/github/Kagorora/Proplite_All_APi?branch=bg-resolve-travis-167246647)



# Getting Started
To get the project up and running on local machine, please follow the instructions

# Prerequisites

- Nodejs should be include in you computer
  if you dont have it installed download it on : https://nodejs.org/en/download/
  
# Tools
. Postman
. code editor(vscode, ....)
  
# clone The project from github
 
$ git clone https://github.com/Kagorora/Proplite_All_APi.git

# Install the required dependencies found in package.json

$ npm install

# start the server

$ npm start

# running the test

$ npm test

# User Endpoints: 

|    Method    |     End Point   |  Public |     Action           |
|--------------|-----------------|---------|----------------------|
|    GET       |        /        |   true  |  get all users       |
|    POST      |   /auth/signup  |   true  |  create user account |
|    POST      |   /auth/signin  |   true  |  Login a user        |

#Properties Endpints : 

|    Method    |     End Point                  |  Public |     Action                   |
|--------------|--------------------------------|---------|------------------------------|
|    GET       |   /api/v1/property/            |   true  |  create propertie            |
|    PATCH     |   /api/v1/property/:id         |   true  |  update property data        |
|    PATCH     |   /api/v1/property/:id/sold    |   true  |  mark a property as sold     |
|    DELETE    |   /api/v1/property/:id         |   true  |  Delete a product advert     |
|    GET       |   /api/v1/property/:id?trpe    |   true  |  Get product with same type  |
|    GET       |   /property/:id                |   true  |  view a specifi advert       |
               

# Author

. Kagorora Alain Maxime

# Acknowledgments

. Andela Team






 





