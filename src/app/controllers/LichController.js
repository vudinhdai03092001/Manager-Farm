const Works = require('../models/Works')
class LichController {
    index(req, res) {
        //   res.render('lich')
        Works.find({}).lean()
            .then(works => {
                res.render('calendar/calendar', { works })
            })
            .catch(error => next(error))
    }
    list(req, res) {
        //   res.render('lich')
        Works.find({}).lean()
            .then(works => {
                res.render('calendar/listCalendars', { works })
            })
            .catch(error => next(error))
    }
    store(req, res) {
        Works.find({}).lean()
            .then(works => {
                res.json({
                    works
                })
            })
            .catch(error => next(error))
    }
    //Add calendar 
    addWork(req, res) {
        const works = new Works(req.body);
        console.log(works)
        works.save()
            .then(() => res.redirect('back'))
    }
    //Delete calendar/:id
    delete(req, res, next) {
        Works.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [GET] Edit calendar/:id
    edit(req, res, next) {
        Works.findById(req.params.id).lean()
            .then(works => res.render('calendar/edit', { works }))
            .catch(next)

    }
    //[PUT] UPDATE calendar/:id
    update(req, res, next) {
        console.log(req.params.id)
        Works.updateOne({ _id: req.params.id }, req.body).lean()
            .then(() => res.redirect('/lich'))
            .catch(next)
    }
    //[POST] search 
    search(req, res, next) {
        var title = req.query.q
        Works.find({
            title: { $regex: title, $options: 'i' } || 0,

        })
            .lean()
            .then(works => res.render('calendar/listCalendars', { works }))
            .catch(next)
    }

    //showModel
    showModel(req, res, next) {
    }

}
module.exports = new LichController