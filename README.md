### Friday 2/18 activity log

8 - 8:25am: look over previous project directory containing test api calls - [https://github.com/Frank-Proulx/eve-tool-test](https://github.com/Frank-Proulx/eve-tool-test)

8:30 - 9am: look around on https://esi.evetech.net/ui# to refamiliarize with routes

9am - 10am: Read over materials about mvp and proposal, write proposal while doing some research in the api's documentation to get clarity (mainly on stretch goals)

10am - am: Using Postman to make calls for the purpose of documenting routes here


### Route documentation

Database of icons: img src="https://images.evetech.net/type/{type_id}/icon?size=64" or more likely "https://images.evetech.net/types/{type_id}/icon"

#### Market

##### All items with adjusted and average price by type_id

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
##### Search buy, sell or all orders by region, page number required but defaults to 1

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
##### Search buy, sell or all orders by region, page number required but defaults to 1 - add type_id to search specific item

https://esi.evetech.net/latest/markets/{region_id}/orders/?datasource=tranquility&order_type=all&page=1&type_id={type_id}

Same results except specific to that type_id

