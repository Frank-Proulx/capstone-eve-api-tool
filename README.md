### Friday 2/18 activity log

8 - 8:25am: look over previous project directory containing test api calls - [https://github.com/Frank-Proulx/eve-tool-test](https://github.com/Frank-Proulx/eve-tool-test)

8:30 - 9am: look around on https://esi.evetech.net/ui# to refamiliarize with routes

9am - 10am: Read over materials about mvp and proposal, write proposal while doing some research in the api's documentation to get clarity (mainly on stretch goals)

10am - am: Using Postman to make calls for the purpose of documenting routes here


# Route documentation

Forge region_id = 10000002
sample type_id = 19053

Database of icons: img src="https://images.evetech.net/type/{type_id}/icon?size=64" or more likely "https://images.evetech.net/types/{type_id}/icon"

## Market

### **All items with adjusted and average price by type_id**

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
### **Search buy, sell or all orders by region, page number required but defaults to 1**

https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=all&page=1 - all
https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=buy&page=1 - buy
https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=sell&page=1 - sell

Sample return (for all):
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