const { Router } = require('express');
const News = require('../models/news_model')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const news = await News.findAll({
            order: [['updatedAt', 'DESC']]
        })
        res.status(200);
        res.render('news', {
            title: 'Новости',
            isNews: true,
            news
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            massage: 'Server error'
        })
    }
})

router.post('/edit', async (req, res) => {
    const id = req.body.id
    News.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.redirect('/news')
            } else {
                res.send({
                    message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating News with id=" + id
            });
        });
})

router.get('/:id', async (req, res) => {
    try {
        const news = await News.findByPk(+req.params.id)
        res.status(200);
        res.render('news_item', {
            title: news.title,
            news: news
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            massage: 'Server error'
        })
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        if (!req.query.allow) {
            return res.redirect('/')
        }

        const news = await News.findByPk(req.params.id)

        res.render('news_edit', {
            title: `Редактировать ${news.title}`,
            news
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            massage: 'Server error'
        })
    }
})

router.get('/:id/delete', async (req, res) => {
    try {
        const id = req.params.id

        if (!req.query.allow) {
            return res.redirect('/')
        }
        News.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.redirect('/news')
                } else {
                    res.send({
                        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Tutorial with id=" + id
                });
            });


    } catch (e) {
        console.log(e)
        res.status(500).json({
            massage: 'Server error'
        })
    }
})


module.exports = router

