# Route documentation

Forge region_id = 10000002
sample type_id = 19053

Database of icons: img src="https://images.evetech.net/type/{type_id}/icon?size=64" or more likely "https://images.evetech.net/types/{type_id}/icon"

## Market

### **Prices - All items with adjusted and average price by type_id**

https://esi.evetech.net/latest/markets/prices/?datasource=tranquility

Sample return (thousands of results):
```
[
  {
      "adjusted_price": 0.0,
      "average_price": 23958500.0,
      "type_id": 43691
  },
  {
      "adjusted_price": 696205.5553492615,
      "average_price": 694765.62,
      "type_id": 32772
  }
]
```
### **Orders - Search buy, sell or all orders by region, page number required but defaults to 1**

https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=all&page=1 - all
https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=buy&page=1 - buy
https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=sell&page=1 - sell

Sample return (shortened - for all):
```
[
  {
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
  },
  {
      "duration": 90,
      "is_buy_order": false,
      "issued": "2022-02-16T08:34:36Z",
      "location_id": 60003760,
      "min_volume": 1,
      "order_id": 6201278468,
      "price": 297500.0,
      "range": "region",
      "system_id": 30000142,
      "type_id": 10694,
      "volume_remain": 1,
      "volume_total": 3
  }
]
```
### **Search buy, sell or all orders by region, page number required but defaults to 1 - add type_id to search specific item**

https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=all&page=1&type_id={type_id}

Same results except specific to that type_id

### **Search history by day for a specific item in a specific region**

https://esi.evetech.net/latest/markets/{region_id}/history/?datasource=tranquility&type_id={type_id}

Sample results (returns results from 1/1/21 till yesterday): 
```
[
  {
      "average": 54184827.59,
      "date": "2021-01-01",
      "highest": 60990000.0,
      "lowest": 42500000.0,
      "order_count": 50,
      "volume": 58
  },
  {
      "average": 51619024.39,
      "date": "2021-01-02",
      "highest": 58670000.0,
      "lowest": 42730000.0,
      "order_count": 30,
      "volume": 41
  }
]
```
### **Return a list of type_ids for a particular region's market (less useful but perhaps for populating dropdowns or creating a 'show only available' toggle)**

https://esi.evetech.net/latest/markets/{region_id}/types/?datasource=tranquility&page=1

Sample results (1000 results per page):
```
[
  43691,
  32772,
  32774,
  32780,
  32782,
  32783,
  18,
  19,
  20,
  21,
  22,
  32792
]
```

### **groups allow a search for all group ids (global), adding a market_group_id will provide info on that specific group, this is for market interface organization**

https://esi.evetech.net/latest/markets/groups/?datasource=tranquility - all groups

sample results (returns all results, 2k+):
```
[
  2,
  4,
  5,
  6,
  7,
  8,
  9,
  10
]
```

https://esi.evetech.net/latest/markets/groups/{market_group_id}/?datasource=tranquility&language=en - for group 306

sample result (exact):
```
{
    "description": "Blueprints of large hybrid ammunition.",
    "market_group_id": 306,
    "name": "Large",
    "parent_group_id": 300,
    "types": [
        1152,
        1153,
        1146,
        1147,
        1148,
        1149,
        1150,
        1151
    ]
}
```

## **Status (player count)**

This can just be a bit of info off to the side showing how many players are logged in atm

https://esi.evetech.net/latest/status/?datasource=tranquility

sample result (exact):
```
{
    "players": 26188,
    "server_version": "2003445",
    "start_time": "2022-02-18T11:01:38Z"
}
```

## **Search**

**This allows the user to search by a string and get all of the examples of the selected category by id, it takes a category, search string, and boolean value based on whether you want strict search or not** 

https://esi.evetech.net/latest/search/?categories={category}&datasource=tranquility&language=en&search={searchTerm}&strict=false

agent
alliance
character
constellation
corporation
faction
inventory_type (this is equal to type_id)
region
solar_system
station

sample result (shortened):
```
{
  "inventory_type": [
      34181,
      3194,
      3195,
      3204,
      34065,
      7367,
      40564,
      41365,
      41366,
      9139
  ]
}
```

## Universe

### **Category - this is a complicated area, looks like there is overlap with the market but it's two different systems that share information, it goes Category > Group > Type**

For a list of all categories...

https://esi.evetech.net/latest/universe/categories/?datasource=tranquility

The above route provides a list of all category_id, which is actually pretty small, this result is the entire list:
```
[
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    14,
    16,
    17,
    18,
    20,
    22,
    23,
    24,
    25,
    26,
    29,
    30,
    32,
    34,
    35,
    39,
    40,
    41,
    42,
    43,
    46,
    350001,
    2100,
    53,
    54,
    2107,
    63,
    65,
    66,
    49,
    87,
    91,
    59
]
```

For a specific category_id...

https://esi.evetech.net/latest/universe/categories/{category_id}/?datasource=tranquility&language=en


Sample result (full result for category 25):
```
{
    "category_id": 25,
    "groups": [
        450,
        451,
        452,
        453,
        454,
        455,
        456,
        457,
        458,
        459,
        460,
        461,
        462,
        465,
        467,
        468,
        469,
        519,
        903,
        1884,
        1911,
        1920,
        1921,
        1922,
        1923,
        2006,
        2022,
        2024,
        4029,
        4030,
        4031,
        4094
    ],
    "name": "Asteroid",
    "published": true
}
```

### **Group**

For a full list of groups (paginated)

https://esi.evetech.net/latest/universe/groups/?datasource=tranquility&page=1

Sample result (shortened, about a thousand per page):
```
[
  0,
  1,
  2,
  3,
  4,
  5,
  6
]
```

For a specific group_id...

https://esi.evetech.net/latest/universe/groups/{group_id}/?datasource=tranquility&language=en

Sample result (exact for group 224):
```
{
  "category_id": 9,
  "group_id": 224,
  "name": "Tracking Computer Blueprint",
  "published": true,
  "types": [
      11621,
      11840,
      15793,
      22928,
      22930
  ]
}
```

### **Type**

For a full list of types (paginated)...

https://esi.evetech.net/latest/universe/types/?datasource=tranquility&page=1

Sample result (shortened):
```
[
  0,
  2,
  3,
  4,
  5,
  6
]
```

For a specific type_id...

https://esi.evetech.net/latest/universe/types/{type_id}/?datasource=tranquility&language=en

Sample result (these are complicated and vary quite a bit for different type_id's, this is for item 450):
```
{
  "capacity": 1.0,
  "description": "Rapid fire multi-barreled energy weapon that delivers a steady stream of damage. \r\n\r\nRequires frequency crystal ammo types: Gamma, Infrared, Microwave, Multifrequency, Radio, Standard, Ultraviolet, Xray.",
  "dogma_attributes": [
    {
        "attribute_id": 128,
        "value": 1.0
    },
    {
        "attribute_id": 1795,
        "value": 0.01
    },
    {
        "attribute_id": 4,
        "value": 500.0
    },
    {
        "attribute_id": 6,
        "value": 1.82
    },
    {
        "attribute_id": 9,
        "value": 40.0
    },
    {
        "attribute_id": 277,
        "value": 1.0
    },
    {
        "attribute_id": 278,
        "value": 1.0
    },
    {
        "attribute_id": 1180,
        "value": 0.01
    },
    {
        "attribute_id": 158,
        "value": 1000.0
    },
    {
        "attribute_id": 160,
        "value": 308.125
    },
    {
        "attribute_id": 161,
        "value": 5.0
    },
    {
        "attribute_id": 162,
        "value": 1.0
    },
    {
        "attribute_id": 422,
        "value": 1.0
    },
    {
        "attribute_id": 47,
        "value": 1.0
    },
    {
        "attribute_id": 50,
        "value": 4.0
    },
    {
        "attribute_id": 51,
        "value": 2100.0
    },
    {
        "attribute_id": 30,
        "value": 5.0
    },
    {
        "attribute_id": 182,
        "value": 3303.0
    },
    {
        "attribute_id": 183,
        "value": 3300.0
    },
    {
        "attribute_id": 1210,
        "value": 15.0
    },
    {
        "attribute_id": 1211,
        "value": 0.6
    },
    {
        "attribute_id": 1212,
        "value": 1.0
    },
    {
        "attribute_id": 61,
        "value": 0.0
    },
    {
        "attribute_id": 64,
        "value": 1.5
    },
    {
        "attribute_id": 54,
        "value": 4200.0
    },
    {
        "attribute_id": 604,
        "value": 86.0
    },
    {
        "attribute_id": 38,
        "value": 1.0
    },
    {
        "attribute_id": 1768,
        "value": 11313.0
    },
    {
        "attribute_id": 620,
        "value": 40000.0
    },
    {
        "attribute_id": 633,
        "value": 0.0
    }
  ],
  "dogma_effects": [
    {
        "effect_id": 10,
        "is_default": true
    },
    {
        "effect_id": 12,
        "is_default": false
    },
    {
        "effect_id": 16,
        "is_default": false
    },
    {
        "effect_id": 42,
        "is_default": false
    },
    {
        "effect_id": 3025,
        "is_default": false
    }
  ],
  "graphic_id": 11118,
  "group_id": 53,
  "icon_id": 350,
  "market_group_id": 570,
  "mass": 500.0,
  "name": "Gatling Pulse Laser I",
  "packaged_volume": 5.0,
  "portion_size": 1,
  "published": true,
  "radius": 1.0,
  "type_id": 450,
  "volume": 5.0
}
```

### **Regions - will need for searching orders as they're region specific**

Get an array of all region_id...

https://esi.evetech.net/latest/universe/regions/?datasource=tranquility

Sample result (shortened):
```
[
  10000001,
  10000002,
  10000003,
  10000004,
  10000005
]
```

And by region_id...

https://esi.evetech.net/latest/universe/regions/{region_id}/?datasource=tranquility&language=en

Sample result (for forge 10000002):
```
{
  "constellations": [
    20000017,
    20000018,
    20000019,
    20000020,
    20000021,
    20000022,
    20000023,
    20000024,
    20000025,
    20000026,
    20000027,
    20000028,
    20000029
  ],
  "description": "\"The greater the State becomes, the greater humanity under it flourishes.\"",
  "name": "The Forge",
  "region_id": 10000002
}
```

### **Bulk names to id's and id's to names - These are POST calls**

This is the post request...

https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en

needs this sent as JSON in the body...
```
[
  "tritanium",
  "isogen",
  "veldspar",
  "heavy water"
]
```

Result is this...
```
{
  "characters": [
    {
      "id": 243070982,
      "name": "Tritanium"
    },
    {
      "id": 1905746431,
      "name": "isogen"
    },
    {
      "id": 95223939,
      "name": "Veldspar"
    },
    {
      "id": 1175186581,
      "name": "Heavy Water"
    }
  ],
  "inventory_types": [
    {
      "id": 34,
      "name": "Tritanium"
    },
    {
      "id": 37,
      "name": "Isogen"
    },
    {
      "id": 1230,
      "name": "Veldspar"
    },
    {
      "id": 16272,
      "name": "Heavy Water"
    }
  ]
}
```

and when passing id's to get names use this endpoint

https://esi.evetech.net/latest/universe/names/?datasource=tranquility

and body gets this...
```
[
    34,
    37,
    1230,
    1175186581
]
```

and the result will be:

[
  {
    "category": "inventory_type",
    "id": 37,
    "name": "Isogen"
  },
  {
    "category": "inventory_type",
    "id": 1230,
    "name": "Veldspar"
  },
  {
    "category": "character",
    "id": 1175186581,
    "name": "Heavy Water"
  },
  {
    "category": "inventory_type",
    "id": 34,
    "name": "Tritanium"
  }
]

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