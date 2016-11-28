# bitstarter

Crowd funding for goals and projects with Bitcoin.

[![Build Status](https://travis-ci.org/Learn-by-doing/bitstarter.svg?branch=master)](https://travis-ci.org/Learn-by-doing/bitstarter) [![Status of Dependencies](https://david-dm.org/Learn-by-doing/bitstarter.svg)](https://david-dm.org/Learn-by-doing/bitstarter)

* Front-facing web site
  * List of all goals/projects
* Admin interface:
  * Add/edit/delete goals / projects to be funded with Bitcoin
  * Login and logout
* Bitcoin API service to look-up funds in public addresses
* Node script to create admin users

## Getting Started

What you need:

* Node.js - https://nodejs.org/en/ - you can use any version (lts/current)

* Git - https://git-scm.com/downloads

* MySql - http://www.mysql.com/ (for Ubuntu https://help.ubuntu.com/lts/serverguide/mysql.html)

You need to get both Node and git working before moving on with the rest of the instructions.
Both have pretty straight forward setup guides so getting them working shouldn't be a problem.

1. After you get these 2 things working, you have to go to [https://github.com/Learn-by-doing/bitstarter](https://github.com/Learn-by-doing/bitstarter) and fork the git repository using these instructions [https://help.github.com/articles/fork-a-repo/](https://help.github.com/articles/fork-a-repo/)

2. Navigate to your project directory and run `npm install` to install all the dependencies required by the project

3. Add a user to the __bitstarter__ database with the same name. Sample SQL statement to do this:
  ```sql
  CREATE USER 'bitstarter'@'localhost' IDENTIFIED BY  'password';

  GRANT USAGE ON * . * TO  'bitstarter'@'localhost' IDENTIFIED BY  'password' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

  GRANT ALL PRIVILEGES ON  `bitstarter` . * TO  'bitstarter'@'localhost';

  CREATE DATABASE bitstarter
  ```

4. Create the first user: In your command line, go to the `/scripts` folder and run `node create-user.js`. Follow the instructions.

5. Run `npm start`

That's it!
