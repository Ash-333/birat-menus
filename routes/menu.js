const express=require('express')
const router=express.Router()
const Menu=require('../models/menu')

router.post('/menu',async(req,res)=>{
    try {
        const { name, price, cuisine } = req.body;
        const newItem = new Menu({
            name,
            price,
            cuisine
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


router.put('/menu/:id',async(req,res)=>{
    try {   
        const menu=await Menu.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(menu)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.delete('/menu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMenu = await Menu.findByIdAndDelete(id);
        if (!deletedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/menus', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/menu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports=router