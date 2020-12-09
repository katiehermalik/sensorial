# **Sensorial**

A process-based art app with weekly activity prompts designed for children ages 3-5. This was a passion project between 2 developers (one a mother and one an educator), designed as a resource for parents and teachers to help facilitate remote learning during the COVID-19 pandemic.

This app will support parents and educators as they guide their young explorers through activities that will be focused on experimentation and engagement of the senses to help them better understand the world around us. 

## Collaborators
* Katie Hermalik
* [Simone Poe](https://github.com/CSimoneCode)

## Index
- [User Stories](#user-stories)
- [Wireframes](#wireframes)
- [ERD](#erd)
- [Technologies](#technologies)

## **User Stories**

The user begins on the landing page where they are greeted by the logo, and a nav bar to the top right contains options to read more about the app, contact, sign up, or log in. 
Upon clicking sign up, the sign up modal pops up and the user is asked to enter their username, email, password, and optionally link a profile picture. Alternatively, if they already have a profile they can click login and only need to enter their username and password. 

After the user logs in they're taken to their "home", the current prompt page. Also, once logged in, the pages also contain a navigation column to the left that shows the list of previous activities that the user can click to see the full journal entry for each past project. The current prompt page shows the current week's activity prompt as well as the materials, instructions, experience goals, and suggested vocabulary to use with their child. There are buttons on this page to take them to the new activity page, to see a random prompt, or to see their activity journal. The random prompt page pulls from a variety of prompt options for the user and they can navigate to a new activity, the activity journal, or go back to the current prompt page from there. 

When the user clicks the "new activity" button, they're redirected to the new activity page, which has 4 inputs labeled Title, Note, Image, and Experience for the user to add their input to. When the user clicks "create", their activity is added in to their activity journal. They're then redirected to the journal entry for the activity they just added. 

Each journal entry displays the activity title, the image the user uploaded (if they chose to do so), and the experience description that they added to that journal entry. The user has an edit button at the bottom that takes them to the update page. This page contains the same fields as the "new activity" page but those fields are populated with the existing content already. The user is able to edit whatever they choose to and either update the entry, or delete the entire entry if they choose to. This page redirects the user to the page for that specific activity upon submission of the edit, or the activity journal upon delete. 

The user is also able to modify or delete their user profile if they choose to. On all pages once the user is logged in, their profile picture (or the default icon) will be located in the upper right corner and will be able to navigate them to their profile. Once their, the fields of username, email, password, and profile picture will be pre-populated and they'll be able to edit their information, or delete their profile if they choose to. Once they edit their profile they're redirected to their home page, and if they delete their profile they're then redirected to the initial landing page. 

## **Wireframes**
![Landing](https://i.imgur.com/EnRH2fd.png)
![Sign Up](https://i.imgur.com/KatmC07.png)
![Login](https://i.imgur.com/YKEZdr4.png)
![Home/Current Prompt](https://i.imgur.com/suAKOSd.png)
![Home Hover](https://i.imgur.com/5wXYr1k.png)
![New Activity](https://i.imgur.com/1tvK1j4.png)
![Show Activity](https://i.imgur.com/9xbDzpd.png)
![Edit Activity](https://i.imgur.com/Yqj8fIS.png)
![Profile](https://i.imgur.com/zlR1Av6.png)
![404](https://i.imgur.com/500ddVu.png)
![About](https://i.imgur.com/KQQRBkb.png)
![Contact](https://i.imgur.com/DX82IkT.png)

## **ERD**
![ERD](https://i.imgur.com/2sa2UQY.png) 

## **Technologies**
### Main Stack
* MongoDB
* Express
* Node.js

### Dependencies
* Body-parser
* Bootstrap
* Dotenv
* EJS
* Express-ejs-layouts
* Express-session
* Method-override
* Mongoose
* Morgan
* Multer
* Startbootstrap-simple-sidebar

## **Copyright**
NavBar template: Copyright (c) 2013-2020 Start Bootstrap LLC 
 