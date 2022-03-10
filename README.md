# Eve Online Market Tool

#### By Frank Proulx

#### A third party developer tool for Eve Online. This project is evolving but MVP will focus on buildling an out of game market interface that utilizes the Eve Swagger Interface api to provide the user detailed market data from throughout the game.

# Research & Planning log

Research and planning log located here [link to doc](https://github.com/Frank-Proulx/capstone-eve-api-tool/blob/main/research-log.md)

# Route documentation

See route documentation here [link to doc](https://github.com/Frank-Proulx/capstone-eve-api-tool/blob/main/route-documentation.md)

# App process documentation

There is a simplified breakdown of the process used to retrieve the displayed info here [link to doc](https://github.com/Frank-Proulx/capstone-eve-api-tool/blob/main/api-process.md)

## Stretch Goals

* Refactor
* Add icons
* Create separate components for the forms in MarketControl - Done
* Make each system the route planner results it's own component so user can click for system detail
* Table column heading labels scroll, should stay fixed for sorting
* Adjust range sort in market table so it is more intuitive
* Tried to make a function to add an expires_in property to buy/sell objects for sorting purposes, failed, now sorting by issued date, doesn't sort properly for orders with a duration less than 90 days since their expiry is not in line with other orders issued at the same time with 90 day duration, will fix this
* Extensive design improvements
* Use authentication to access those routes that need it
* Use firebase to build/refresh a static database from the api at regular intervals rather than making api calls for every detail, starting with less often changing items and moving towards everything going in my database and pulling large amounts of data from the api
* Host site

## Known Bugs

* Need to double click search if you make a second search in route planner, due to delay in setState computing.

## License

[MIT](https://opensource.org/licenses/MIT)

If you have any issues, questions, ideas or concerns, please reach out to me at my email and/or make a contribution to the code via GitHub.

Copyright (c) 2022 Frank Proulx