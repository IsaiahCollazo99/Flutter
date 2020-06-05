# Flutter
Flutter is a Social Media Web App taking inspiration from the likes of Twitter

## Table of contents
1. [Screenshots](#screenshots)
2. [Features](#features)
    1. [Timeline](#timeline)
3. [Installation Instructions](#installation)
4. [Technologies](#technologies)

___

### Screenshots <a name="screenshots"></a>
___
<details>
    <summary><b>Feed Page</b></summary>
    <img src="https://i.imgur.com/jIT7oBA.png" alt="Feed Page">
</details>

<details>
    <summary><b>Profile Page</b></summary>
    <img src="https://i.imgur.com/YDXtN6q.png" alt="Profile Page">
</details>

<details>
    <summary><b>Search Page</b></summary>
    <img src="https://i.imgur.com/80uRYv1.png" alt="Search Page">
</details>

___

### Features <a name="features"></a>
___
Users can:  
* View all posts by other users  
* Create an account and login with Firebase  
* Make new posts with pictures and hashtags (optional)  
* Like and repost all posts (including their own)  
* Search for posts, users, or hashtags  
* View top news headlines  

#### Timeline <a name="timeline"></a>

| Future                            | Working                      | Completed                                 |
|-----------------------------------|------------------------------|-------------------------------------------|
| Follow users, and limit feed page | Add user bio                 | Display User Posts                        |
| Pin a post to top of your profile |                              | Allow User to search                      |
| Save a post to a collection       |                              | Make new posts with pictures and hashtags |
| Direct Messaging                  |                              | Like and repost all posts                 |
| Tag users in a post               |                              | Create account and login with Firebase    |
|                                   |                              | Display all top news headlines            |
|                                   |                              | Ability to edit your profile              |

___
### Installation Instructions <a name="installation"></a>
___
1. Fork and clone this repository
2. In the root folder run ```npm start``` (This will install and run the backend)
3. From the root folder still run ```psql -f backend/db/schema.sql``` (This will create the local database)
    * You might want to check to make sure the database was correctly created, if not check the file for any commented code and uncomment all of it
4. After the database is installed you can ```cd frontend``` and run ```npm i``` or ```npm install``` to install all necessary packages
5. Start coding! (to check the live test run ```npm start``` in the frontend folder

___
### Technologies <a name="technologies"></a>
___
Flutter was created using
* React
* Express.js
* Firebase
* SQL
