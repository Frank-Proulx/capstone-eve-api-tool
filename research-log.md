### Research & Planning Log
#### Friday 2/18

8 - 8:25am: look over previous project directory containing test api calls - [https://github.com/Frank-Proulx/eve-tool-test](https://github.com/Frank-Proulx/eve-tool-test)

8:30 - 9am: look around on https://esi.evetech.net/ui# to refamiliarize with routes

9am - 10am: Read over materials about mvp and proposal, write proposal while doing some research in the api's documentation to get clarity (mainly on stretch goals)

10am - 12:10pm: Using Postman to make calls for the purpose of documenting routes here

1:10pm - 2pm: Continue researching endpoints and documenting api calls and results

2pm - 3pm: Looking into the "Universe" section of the api, lots of global info here and difficult to parse, added endpoints for category, group and type id's

3pm - 4pm: Continue using postman to sample api calls and map endpoints, spent some time in eve-dev discords trying to get answers on images to no avail.

4pm - 5pm: Researched how to send an array of strings as JSON in the body of a postman post call in order to use the search name by id and id by name functions in the ESI, figured it out and is working in postman, will continue researching how to do this on my own with javascript

#### Friday 2/25

8 - 8:30am: Review progress so far and organize to do list for the day

8:30 - 9am: Further test and add endpoint info for post requests, begin researching making post calls using fetch()

9 - 10am: Begin mapping out the process for each feature, working on search by name.

10 - 11:30am: Continue mapping out specifics of an item search, realize that api info is incomplete, search online for solutions in various eve 3rd party dev resources.

11:30 - 12pm: Join slack channel for 3rd party developers for eve tools, keep researching/troubleshooting finding complete market info

1pm - 2pm: Review lessons on redux, brainstorm best method for dealing with data (repeated api calls, saved json in constants, use firebase?)

2pm - 3:15pm: Add simple components, work on dropdown menu and research best way to handle state, experiment with changing state in control file.

3:15 - 4pm: Test api call, get results to work with hardcoded fields, next working on getting input to register as not null.

4 - 4:30pm: Solve null input issue by moving api call into submit function for now.

4:30 - 5pm: Research setState to figure out why it's taking too long to update for the api call to receive that data in time.

#### Friday 3/4

8am - 8:30am: reorganize and create to do list

8:30 - 9:30am: coding/testing api calls, can now search by name and get market result sorted into buy and sell orders.

9:30am - 10am: research using tables with react

10am - 12pm: coding

12pm - 1:30pm: coding

1:30pm - 2:30: research how to get all location_id without making hundreds of api calls per search, accept that i'll need to make the calls but make a plan to make them state.

2:30pm - 3:45pm: try to make a function that creates a minidatabase of structure info objects, extensive troubleshooting to get this working. Have added mini DB to state and able to display but only works sometimes, continue bugfixing.

3:45pm - 5pm: made many many adjustments, narrowed problem down to the structureArray being filtered, needed to account for if the station was a private endpoint thus creating an empty array that it was then trying to get the name property from the 0 index, which did not exist, fixed with an || operator in the filterLocation function in MarketTable. **Need to figure out why TTT isn't displaying**