const mongoose = require('mongoose');
const Restaurant = require('../models/resturants');

const getRestaurantWithCuisinesAndMenus = async (restaurantId) => {
    const pipeline = [
        {
            "$match": {
                "_id": new mongoose.Types.ObjectId(restaurantId)
            }
        },
        {
            "$lookup": {
                "from": "cuisines",
                "localField": "_id",
                "foreignField": "resId",
                "as": "cuisines"
            }
        },
        {
            "$unwind": {
                "path": "$cuisines",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            "$lookup": {
                "from": "menus",
                "localField": "cuisines._id",
                "foreignField": "cuisine",
                "as": "menus"
            }
        },
        {
            "$lookup": {
                "from": "cuisines",
                "localField": "menus.cuisine",
                "foreignField": "_id",
                "as": "menuCuisines"
            }
        },
        {
            "$match": {
                "menus.name": { "$ne": null },
                "menus.price": { "$ne": null }
            }
        },
        {
            "$unwind": {
                "path": "$menus",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "name": { "$first": "$name" },
                "address": { "$first": "$address" },
                "intro":{"$first":"$intro"},
                "image":{"$first":"$image"},
                "cuisines": { "$addToSet": "$cuisines" },
                "menus": {
                    "$push": {
                        "menuId": "$menus._id", // Add menuId
                        "name": "$menus.name",
                        "price": "$menus.price",
                        "cuisine": { "$arrayElemAt": ["$menuCuisines.name", 0] }
                    }
                }
            }
        }
    ];

    const result = await Restaurant.aggregate(pipeline).exec();

    // If the result is empty, return the restaurant info
    if (result.length === 0) {
        const restaurant = await Restaurant.findOne({ "_id": restaurantId }).exec();
        return restaurant;
    }

    return result[0];
};

module.exports = getRestaurantWithCuisinesAndMenus;
