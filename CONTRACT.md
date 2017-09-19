# API Contract

### Exchange Endpoint
```
// Payload
[POST] /exchange/generate
{
    "eventId": 2
}

[POST] /exchange/email
{
    "eventId": 2
}

[GET] /exchange/status/{eventId} (BONUS)
{
    "eventName": "Christmas 2017",
    "wishlistCompleted": [20, 26],
    "wishlistBreakdown": [
        {
            "userId": 1,
            "userName": "Pey Lun",
            "wishlistCount": 1,
            "lastUpdate: "2017-11-25 14:15:37",
        },
        {
            "userId": 2,
            "userName": "Martin",
            "wishlistCount": 0
        },
        ...
    ]
}
```

### Wishlist Endpoint
```
[POST] /wishlist/{idHash}
{
    "list: [
        {
            "id": 1,
            "name": "Ipad",
            "description": "Lasted Ipad Air from Apple",
            "imageLink": "https://images.apple.com/v/ipad-pro/l/images/specs/10_5_in_ipad_pro_small.jpg",
            "urlLink": "https://www.apple.com/sg/shop/buy-ipad/ipad-pro"
        },
        {
            "name": "iPhone",
            "description": "iPhone X",
            "imageLink": "https://images.apple.com/v/iphone/home/w/images/home/iphone_x_small.jpg"
        }
    ]
}

[GET] /wishlist/{idHash}
{
    "id": 1,
    "userId": 1,
    "userName": "Pey Lun",
    "list: [
        {
            "id": 1,
            "name": "Ipad",
            "description": "Lasted Ipad Air from Apple",
            "imageLink": "https://images.apple.com/v/ipad-pro/l/images/specs/10_5_in_ipad_pro_small.jpg",
            "urlLink": "https://www.apple.com/sg/shop/buy-ipad/ipad-pro"
        },
        {
            "id": 2,
            "name": "iPhone",
            "description": "iPhone X",
            "imageLink": "https://images.apple.com/v/iphone/home/w/images/home/iphone_x_small.jpg"
        }
    ]
}
```
        
    


### Event endpoint [BONUS]
```
[POST] /event
// Payload
{
    "name": "Christmas 2017",
    "users": [1, 2, 3, 4, 5, 6, 7, 10, 23, 24, 25],
    "date": "2017-12-25 00:00:00"
}
```
### User endpoint [BONUS]
```
[POST] /user
// Payload
{
    "fullName": "Pey Lun",
    "email": "phsieh@tremorvideodsp.com"
}

[GET] /user/{id}
//Response
{
    "id": 1,
    "fullName": "Pey Lun",
    "email": "phsieh@tremorvideodsp.com"
}
```
