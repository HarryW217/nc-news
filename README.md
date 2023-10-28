# NC News

###### A News App...

## Project Summary

'NC News' is an attempt at coding and deploying a front-end application. Its purpose is to allow users to navigate a database of articles. This can be done by filtering by a specific topic, sorting the articles by a specified property and even changing the order they are listed.

There is also interactivity in this app; a user account has been hardcoded to allow visitors to upvote or downvote an article, and post and delete comments.

## Back-end server

This project makes use of the API News back-end server I developed, which you can also take a look at on my Github profile: https://github.com/HarryW217/API-news

## Hosted Version

The app is hosted using Netlify. Have a visit yourself here: https://ncnewsbyharry.netlify.app/


## How to use NC News!

`Browsing` : Users can look through the website, viewing various article previews and then clicking on the 'Read Article' button to view the dedicated article page. Each article has a button that will take the user back home if they wish to browse the other articles. 

`Filtering` : Users can choose which articles they would like to display. They can filter by topic with the click of the topic's button. They may also sort the articles by comment count, votes (both either from highest or lowest) or date (from newest or oldest). The articles are sorted in descending date order by default. 

`Voting` : The user may vote on any article, increasing or decreasing the vote count by 1. The hard-coded user can only change the amount either way by 1 on any visit to the page. 

`Commenting` : The user may comment as many times as they like on any article. They have the option to delete their posted comments if they wish. 

## Instructions for running locally

1. Make sure you have an up-to-date version of Node installed. Mine was: `Node.js -v20.8.0`

2. Clone the repository by running the following command in your terminal:

```
git clone https://github.com/HarryW217/nc-news.git
```

3. Making sure you are in the directory you have cloned the project into, change directories to the project...

```
cd nc-news
```

And then...

```
code .
```

Now you are ready to build on and deploy your own front-end application. Enjoy!
