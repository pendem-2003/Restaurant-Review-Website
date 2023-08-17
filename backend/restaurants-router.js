import express from "express"
import restaurantsCtrl from "./restaurants-controller.js"
import restaurantsctrl from "./restaurants-controller.js"
import reviewCtrl from "./reviews-controller.js"
const router= express.Router()

const getReviewsById = (req,res)=>{
    res.send("hello world")
}

router.route('/')
.get(restaurantsctrl.getRestaurants)
router.get('/:id',restaurantsCtrl.getRestaurantById);
/* .put(updateReviewsById())
.delete(deleteReviewsById())
.post(createReviewsById())
 */
router.route('/reviews')
//.get(reviewCtrl.readReview)
.post(reviewCtrl.createReview)
.put(reviewCtrl.updateReview)
.delete(reviewCtrl.deleteReview)

export default router