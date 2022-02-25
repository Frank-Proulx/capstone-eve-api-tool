# Eve Online Market Tool

#### By Frank Proulx

#### A third party developer tool for Eve Online. This project is evolving but MVP will focus on buildling an out of game market interface that utilizes the Eve Swagger Interface api to provide the user detailed market data from throughout the game.


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

# Feature mapping 

**Note - Able to download json responses for including static data**

## Search for item id by name(as post in universe route), return buy and sell prices for each region:

**IMPORTANT - THIS MIGHT BE INFERIOR TO THE SEARCH ROUTE WHICH TAKES A STRING AND RETURNS A LIST OF ID'S**

* Need input, user enters name into input (exact?)
* Should site populate a full list of names, if so provide some kind of dropdown? (this will have too many entries, need to research autofill as they're typing)
* Will there be some backend storage? Or will the site query all things everytime a user visits
* Problem is that in order to search item, need to find type_id of that item using search by string post call.

Process for searching item by name:

Enter name "tritanium"
Post this and receive a json object that has two keys, "characters" and "inventory_types", these search by name posts will always return categorized results from this list:

* agent
* alliance
* character
* constellation
* corporation
* faction
* inventory_type (this is equal to type_id)
* region
* solar_system
* station

each category will hold an array of objects, the objects will have an "id" key and a "name" key with corresponding values. 

```
{
    "characters": [
        {
            "id": 243070982,
            "name": "Tritanium"
        }
    ],
    "inventory_types": [
        {
            "id": 34,
            "name": "Tritanium"
        }
    ]
}
```

so will need to get result = response.inventory_types, this will typically be an array with one object, in which case it will be result[0].id, but will need to account for possibility there is more than one result **to be continued**

## Search for a list (or single if strict is set to true) of id's based on an inputted string

For this feature the inventory_type category will be added to the api call since we will only be dealing with items for market searches. A search for "veldspar" which has multiple variants will return for strict(true):
```
{
  "inventory_type": [
    1230
  ]
}
```
and for string(false):
```
{
  "inventory_type": [
    1230,
    28430,
    17470,
    28431,
    34420,
    17471,
    46689,
    28432,
    46705
  ]
}
```

In order to search for orders will need to give a region (these should be hard-coded?), as well as choose buy/sell/all, also results will be paginated so will need ability to view further pages (and sort?), if page n does not exist, response is an object, if page does exist response is an array, check subsequent pages until receive an object then stop, use spread(?) to merge pages together.

Will need to then make a grid that has two distinct sections for buy and sell and in each section:

* Time remaining: duration property - issued property
* location: https://esi.evetech.net/latest/universe/stations/{location_id}/?datasource=tranquility or save this locally
* location will be station/region/system
* Price
* Volume remain (and volume total?)
* Range (region etc)
* 

"duration": 90,
"is_buy_order": false,
"issued": "2022-02-17T18:15:14Z",
"location_id": 60003760,
"min_volume": 1,
"order_id": 6202327043,
"price": 22990000.0,
"range": "region",
"system_id": 30000142,
"type_id": 11198,
"volume_remain": 2,
"volume_total": 2

# Route documentation

See route documentation here [link to doc](https://github.com/Frank-Proulx/capstone-eve-api-tool/blob/main/route-documentation.md)

## License

[MIT](https://opensource.org/licenses/MIT)

If you have any issues, questions, ideas or concerns, please reach out to me at my email and/or make a contribution to the code via GitHub.

Copyright (c) 2022 Frank Proulx