import {ObjectId} from "mongodb";
let reviews;
export default class reviewAccess {
    static async resRef(client) {
        if (reviews) return;
        reviews = await client.db('sample_restaurants').collection('reviews')
    }
    static async readReview(queryObj) {
        try {
            let query = await queryObj.restaurant_id? { restaurant_id: new ObjectId(queryObj.restaurant_id)}:{} 
            //console.log(query)
            const cursor = await reviews.find(query)
            const final= await cursor.toArray()
            //console.log(final)
            return final
        }
        catch (e) {
            console.log(e)
        }
    }
    static async createReview(queryObj) {
        try {
            queryObj.restaurant_id=new ObjectId(queryObj.restaurant_id)
            const result = await reviews.insertOne(queryObj)
        }
        catch (e) {
            console.log(e)
        }
    }
    static async updateReview(queryObj) {
        try {
            let query = {_id: new ObjectId(queryObj.reviewId) }
            const result = await reviews.updateOne(query, { $set: { review: queryObj.review, date: queryObj.date } })
        }
        catch (e) {
            console.log(e)
        }
    }
    static async deleteReview(queryObj) {
        try{
            let query= {_id: new ObjectId(queryObj.reviewId)}
            //console.log(query)
            const result= await reviews.deleteOne(query)
            //console.log(result)
        }
        catch(e){
            console.log(e)
        }
    }
}