# Trello Clone App

Clone of [Trello](https://trello.com/) application using [Trello Api](https://developer.atlassian.com/cloud/trello/rest/). 
Idea was to create a MV pattern with separate .html files for each of the components View part. I used webpack for reading the html files and inject them in the component typescript file. I used class oriented architecture for component building. At the time of writting I had no React experience and my main role model was Angular.

Application is built on pure JS with the help of Webpack building tools for TS compilation. I do NOT recommend using this approach in the production applications.

### For running project locally, create .env.dev file with following keys:

`BASE_URL = http://localhost:9000`\
`TRELLO_API_KEY = xxxxx`\
`TRELLO_SECRET = xxx`\
`TRELLO_API_BASE_URL=https://api.trello.com/1`

Application is hosted live on [Firebase](https://trello-clone-gavrilo.web.app/)

### Currently supported features:

* Authentication
* View Active Boards
* Create Board
* View Board Lists and Cards
* Edit Card
* Add Card
* Reorder Cards inside List
