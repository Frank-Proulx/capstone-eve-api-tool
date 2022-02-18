**Name of Student:** Frank Proulx

**Name of Project:** Eve Online Market Tool

**Project's Purpose or Goal:** This project will provide an easy to use out of game market tool that allows users to search items in their various locations, calculate profits on those items and plan trades.

**List the absolute minimum features the project requires to meet this purpose or goal:** The absolute MVP will be an app that uses Eve's api to search the buy and sell prices of a selected item in any region of the game. The app will be styled like the in game market interface for ease of use. 

**What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.**

* React (JSX)
* Redux (not definitely but probably)
* Firebase potentially based on usefullness, will evaluate once we cover that tool
* Javascript
* HTML/CSS/Bootstrap
* NPM
* ESI (Eve Swagger Interface) - the OpenApi for Eve Online

**If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.**

* Add feature where user is able to enter a location and determine best trades within a certain distance based on buy/sell order availablity.
* Add the ability to use blueprint info plus market info to determine the most profitable items to manufacture in game.
* Use Eve's SSO (Single Sign On) to allow user to log in as their character in order to access character specific routes, enabling them to send and check in game mail.
* Use SSO further to allow user to interact with character details (modify skill plan etc)

**What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?** Mostly just OAuth 2.0 for the SSO routes, potentially will need/want to use some form of storage as there will be a large amount of data involved and the way the ESI is set up it will potentially require a significant amount of api calls to perform certain actions. I'll be testing this to see viability as soon as possible.

**Is there anything else you'd like your instructor to know?** There's a lot of research involved in getting this working, so I expect things to change somewhat as time goes on, that said I think I have chosen an MVP that is realistic and doable, and if all goes well there will be time for stretch goals as well. Either way I think this project will provide a lot of room to grow so I plan on developing it further post graduation as a solid portfolio piece that has a real world application.