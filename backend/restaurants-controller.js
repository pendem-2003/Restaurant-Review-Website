import restaurantsAccess from "./restaurants-access.js"
import reviewAccess from "./reviews-access.js"

export default class restaurantsCtrl {
    static async getRestaurants(req, res, next) {
        //console.log(req.query)
        let queryObject = {}
        queryObject.page = req.query.page ? parseInt(req.query.page) : 0;
        queryObject.restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : 12;

        if (req.query) {
            try {
                if(req.query.search) queryObject.search= req.query.search
            }
            catch (e) {
                console.log(`error reading html query${e}`)
            }
        }
        //console.log(queryObject)
        let {restaurantsList, restaurantCount}= await restaurantsAccess.getRestaurants(queryObject);
        res.send({
            documents: restaurantsList,
            page_: queryObject.page,
            perPage: queryObject.restaurantsPerPage,
            total: restaurantCount
        })
    }

    static async getRestaurantById(req,res,next){
        try {
            let id = req.params.id || {}
            let restaurant = await restaurantsAccess.getRestaurantById(id)
            if (!restaurant) {
              res.status(404).json({ error: "Not found" })
              return
            }
            let query= {restaurant_id: id}
            const reviews= await reviewAccess.readReview(query)
            res.send({
                details: restaurant,
                reviews: reviews
            })
          } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
          }
    }
}