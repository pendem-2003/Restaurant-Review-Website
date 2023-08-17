
import { ObjectId } from "mongodb";
let restaurant;
export default class restaurantsAccess {
  //static to use the method without creating object of the class(without creating an instance)
  static async resRef(client) {
    if (restaurant) { console.log(`Reference to collection already established`) }
    else { restaurant = client.db('sample_restaurants').collection('restaurants') }
  }

  static async getRestaurants(queryObject) {
    var cursor;
    console.log(queryObject)
    if (queryObject.search) {
      //console.log(queryObject.search)
      let pipeline = [
        {
          $search: {
            index: "default",
            text: {
              query: queryObject.search,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]
      cursor = await restaurant.aggregate(pipeline)
    }
    else { 
      cursor = await restaurant.find()
    }
    const restaurantCount= await restaurant.countDocuments()
    const displayCursor = await cursor.skip(queryObject.page * queryObject.restaurantsPerPage).limit(queryObject.restaurantsPerPage)
    const restaurantsList = await displayCursor.toArray()
    return { restaurantsList, restaurantCount }
  }

  static async getRestaurantById(id) {
    try {
      const id_ = new ObjectId(id)
      const document = await restaurant.findOne(id_);
      return document
    }
    catch(e){
      console.log(e)
    }
  }
}
