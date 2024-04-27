const express=require('express')
const router=express.Router()
const Cuisine=require('../models/cuisine')

router.post('/cuisine', async (req, res) => {
    try {
        const newCuisine = new Cuisine(req.body);
        const savedCuisine = await newCuisine.save();
        res.status(200).json(savedCuisine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/cuisines', async (req, res) => {
    try {
        const cuisines = await Cuisine.find();
        res.json(cuisines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/cuisine/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cuisine = await Cuisine.findById(id);
        if (!cuisine) {
            return res.status(404).json({ message: 'Cuisine not found' });
        }
        res.status(200).json(cuisine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/cuisine/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCuisine = await Cuisine.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedCuisine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports=router