const { Router } = require('express')
const router = Router()
const News = require('../models/news_model')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить новости',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    try {
        const news = await News.create({
            title: req.body.title,
            description: req.body.description,
            img: req.body.img
        })
        res.status(201);
        res.redirect('/news')
    } catch (e) {
        console.log(e)
        res.status(500).json({
            massage: 'Server error'
        })
    }
})

module.exports = router