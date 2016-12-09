# bitstarter

A crowd funding website that uses Bitcoin.

[![Build Status](https://travis-ci.org/Learn-by-doing/bitstarter.svg?branch=master)](https://travis-ci.org/Learn-by-doing/bitstarter) [![Status of Dependencies](https://david-dm.org/Learn-by-doing/bitstarter.svg)](https://david-dm.org/Learn-by-doing/bitstarter)


## Requirements

You will first need to have the following dependencies installed before you can work on this project:
* [Node.js](https://nodejs.org/en/) - you can use either version (LTS or latest)
  * For Windows - use the installation package from the node website
  * For Linux and Mac - use [nvm](https://github.com/creationix/nvm) to install node
* [Git](https://git-scm.com/downloads)
* [MySQL](http://www.mysql.com/)
  * [Installation instructions for Ubuntu](https://help.ubuntu.com/lts/serverguide/mysql.html)

You need to get both Node and git working before moving on with the rest of the instructions. Both have pretty straight forward setup guides so getting them working shouldn't be a problem.


## Database Setup

Once you have MySQL installed, you will need to setup the local database. Run the following SQL queries to create the database and user:
```sql
CREATE USER 'bitstarter'@'localhost' IDENTIFIED BY  'password';

GRANT USAGE ON * . * TO  'bitstarter'@'localhost' IDENTIFIED BY  'password' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

GRANT ALL PRIVILEGES ON  `bitstarter` . * TO  'bitstarter'@'localhost';

CREATE DATABASE bitstarter
```


## Install Node Modules

Before you can run the server application, you will need to install the node module dependencies for the project. From inside the project directory, run the following command:
```bash
npm install
```
This will install the dependencies listed in the project's [package.json](https://github.com/Learn-by-doing/bitstarter/blob/master/package.json) file.


## Start the Application

Now that you have all the dependencies required, you can run the app:
```bash
npm start
```
If everything is OK, then you should see the following:
```
Example app listening on port 3000!
```


## Creating Test Users

A node script is used to create test users. Run the script from your project directory like this:
```bash
node ./scripts/create-user.js
```
Follow the instructions to create a new user.

Once you've created a test user, you should now be able to login with its username and password. Open your browser and go to [http://localhost:3000/login](http://localhost:3000/login) to login to the test user account.


## How Do I Contribute?

Terminology:
* [pull request](https://help.github.com/articles/about-pull-requests/) - a request to include changes in a project
* [fork](https://help.github.com/articles/fork-a-repo/) - a copy of a project (all files and history)

To contribute to the project, you will use pull requests instead of pushing your changes directly. The first thing you must do is [create a fork of this project](https://github.com/Learn-by-doing/bitstarter/fork). This will create a full copy of the project in your GitHub account. You have full read/write privileges to your fork.

Now that you have your fork, you must clone it locally. Run the following command:
```bash
git clone https://github.com/YOUR_USERNAME/bitstarter.git
```
Be sure to replace `YOUR_USERNAME` with your GitHub username.

Make your changes to the project locally. Save your changes by committing them:
```bash
git commit -a -m "Some message goes here"
```

Push the changes to your fork:
```bash
git push origin master
```

Go to your fork on GitHub and click the green "Create a pull request" button. At the next screen, scroll down to view the changes you've made. Click the "Create pull request" to submit the changes as a pull request.


## How to Keep Your Local Project Up-to-date

Overtime, the project will change. To keep your local copy of the project up-to-date, you will need to download the changes from Github and merge them into your local instance of the project.

If you have not done so already, you will need to add the `upstream` remote to your local git repository:
```bash
git remote add upstream https://github.com/Learn-by-doing/bitstarter.git
```

To download the latest changes from upstream (this does not make any changes to your files):
```bash
git fetch upstream
```
[upstream](https://github.com/Learn-by-doing/bitstarter) is the name of the main project's remote

Now to merge the latest changes into your local master branch:
```bah
git checkout master
git merge upstream/master
```

And finally, update your fork:
```bash
git push origin master
```

That's it! Your local and your fork (in GitHub) should now both be up-to-date.


## Testing environment

1. For testing you have to create a testing database. Sample SQL statement to do this:

```sql
CREATE USER 'bitstarterTest'@'localhost' IDENTIFIED BY  'bitstarterTest';

GRANT USAGE ON * . * TO  'bitstarterTest'@'localhost' IDENTIFIED BY  'bitstarterTest' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

GRANT ALL PRIVILEGES ON  `bitstarterTest` . * TO  'bitstarterTest'@'localhost';
```

2. Open a terminal and run `grunt`
