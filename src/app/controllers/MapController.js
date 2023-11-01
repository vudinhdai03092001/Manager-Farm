class MapController{
    index(req,res){
        res.render('map/app');
    }
}
module.exports = new MapController