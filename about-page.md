# Eve Online Interface
_Epicodus capstone by Frank Proulx_

The goal of this project is to build a comprehensive out of game 3rd party dev tool for the MMO Eve Online. I started playing eve in 2007 and though I don't have much time for it these days I still enjoy popping back in from time to time. What I really like about the game is the sheer magnitude of complexity in it's player run economy, arguably on par with some small countries. Due to the fact that everything in game is player made, with hundreds of thousands of players logging in per day, 9 million active subsribers, and up to half a quadrillion items being sold per day, there is great need for tools that make life easier for Eve's miners, manufacturers, traders, as well as pirates, criminals and beyond.

This project uses the ESI (Eve Swagger Interface) API. It contains over a hundred endpoints, some public, some needing authentication with a character's account, with data pulled directly from the game's database. I started with a market interface for planning trading, buying or selling without having to be in game. I also was able to build a route planner for plotting out the sometimes treacherous routes amongst the thousands of star systems in game.

**MVP:**

My stated MVP was:

* Start with comprehensive market interface for searching items and their cost throughout the game
* Build profit calculator to find best deals and trade oppurtunities

I hit the first point completely, the second I haven't reached but I'm not far off, that said I think it would be much more effective to do this after incorporating firebase so that it can be simply running functions on the results of database queries rather than needing a million api calls for each calculation.

**Stretch Goals:**

When signing up my stated stretch goals were:
* Use blueprint info plus market data to calculate currently best items to produce for profit
* Use SSO to utilize character specific routes
* Include sending in game mails
* Add ability to interact with character (modify skill plan etc)
* Layer on functionality from as many other routes as possible

These remain on the list, having now worked on the project I'd also include:

* Refactor
* Add icons
* Make each system the route planner results it's own component so user can click for system detail
* Table column heading labels scroll, should stay fixed for sorting
* Adjust range sort in market table so it is more intuitive
* Tried to make a function to add an expires_in property to buy/sell objects for sorting purposes, failed, now sorting by issued date, doesn't sort properly for orders with a duration less than 90 days since their expiry is not in line with other orders issued at the same time with 90 day duration
* Extensive design improvements
* Use authentication to access those routes that need it
* Use firebase to build/refresh a static database from the api at regular intervals rather than making api calls for every detail, starting with less often changing items and moving towards everything going in my database and pulling large amounts of data from the api
* Host site

**Technologies/tools:**

* React
* Javascript
* Node.js
* Postman
* Eve Swagger Interface API
* HTML
* CSS

**Explain the decisions your made throughout the process:**

I wanted to be very thorugh in researching the endpoints available as they can be somewhat hard to trace using just the ESI. Mainly this is due to the fact that most API calls don't return all the likely needed info for that endpoint, they return an object containing a bunch of keys that hold id's that need additional API calls to translate into usable values (some need this process repeated multiple times). After researching and documenting this quite a bit I realized that it wasn't really getting any easier to conceptualize, no matter how thorough my documentation, so at that point I took what I had and started building. Which takes me to...

**Lessons Learned:**

I learned quite a few lessions throughout this process, here's a few:

* I tried to focus on planning how I'd execute the app, I wish I had spent more time thinking about how I would use it, but fortunately I have stretch goals for that
* I spent a huge amount of time debugging, some of which was just learning a lot more about react and javascript, some of which was directly due to the need for making multiple api calls in stages for a single search (sometimes hundreds), and getting that to work properly and also render immediately. If I could do it all over again, I would start with a firebase database and scrape the api rather than making all these calls every time the user clicks submit.
* One of the biggest things I learned which I feel will really help me as a developer was learning to triage my time, as every hour invested in something was an hour invested in nothing else. Virtually everything I did resulted in some bug or error or exception. I learned a lot about finding that balance of how much time to spend trying to fix, or deciding to change, or remove, or sometimes moving on to something else and coming back to it when I get my "Eureka!" moment out of nowhere at some random point in the day. 
