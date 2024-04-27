const express = require('express');
const router = express.Router();
const fs=require('fs')
const Restaurant = require('../models/resturants');
const getRestaurantWithCuisinesAndMenus=require('../utils/restuaurant')
const cloudinary=require('../utils/cloudinaryConfig')
const upload=require('../utils/uploader')

router.post('/restaurant',upload.single('image'), async (req, res) => {
    try {
        const imgURl=req.file.path
        const newRestaurant = new Restaurant({
            name:req.body.name,
            address:req.body.address,
            intro:req.body.intro,
            image:imgURl
        });
        const restaurant = await newRestaurant.save();
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/restaurant/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
        console.log(restaurant)
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/restaurant/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;
    
    try {
        const result = await getRestaurantWithCuisinesAndMenus(restaurantId)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
