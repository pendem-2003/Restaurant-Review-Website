import reviewAccess from "./reviews-access.js"
export default class reviews {
    
    static async createReview(req, res, next) {
        try {
            let queryObj = {}
            if (req.body) {
                queryObj.restaurant_id= req.body.restaurant_id
                queryObj.review= req.body.review
                queryObj.userInfo= {name: req.body.name, userId: req.body.userId}
                queryObj.date= new Date()
            }
            const result= await reviewAccess.createReview(queryObj)
            res.json('succesful: Review added')
        }
        catch(e){
            console.log(e)
        }
    }
    static async updateReview(req, res, next) {
        try {
            let queryObj = {}
            if (req.body) {
                queryObj.review= req.body.review
                queryObj.reviewId= req.body.reviewId
                queryObj.userId= req.body.userId
                queryObj.date= new Date()
            }
            const result= await reviewAccess.updateReview(queryObj)
            res.json('succesful: Review edited')
        }
        catch(e){
            console.log(e)
        }
    }
    static async deleteReview(req, res, next) {
        try {
            let queryObj = {}
            if (req.body) {
                queryObj.reviewId= req.query.reviewId
            }
            const result= await reviewAccess.deleteReview(queryObj)
            res.json('succesful: Review deleted')
        }
        catch(e){
            console.log(e)
        }
    }
}