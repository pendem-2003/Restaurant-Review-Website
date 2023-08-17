import React from "react";
import { useParams,useLocation } from "react-router-dom";
import Api from "../services/api-requests";
import { Link } from "react-router-dom";
import "../styles/reviews.css"

export default function Reviews(props) {
    const { id } = useParams()
    const location= useLocation()
    let restaurantDetails={};
    if(location.state && location.state.details) {restaurantDetails= {details:location.state.details,reviews:[]}}
    //console.log(id)
    const [restaurant, setRestaurant] = React.useState(restaurantDetails)
    React.useEffect(() => {
        retreiveRestaurant()
    }, [])
    
    function retreiveRestaurant() {
        Api.get(id)
            .then(props => {
                //console.log(props.data)
                setRestaurant(props.data)
            })
            .catch(e => console.log(e))
    }
    function deleteReview(reviewId, index) {
        Api.delete(reviewId)
        setRestaurant((prev) => {
            prev.reviews.splice(index, 1)
            return {...prev}
        })
    }

    function returnRest(details) {
        //console.log(props)
        const address = `${details.address.building} ${details.address.street} ${details.address.zipcode}`;
        return (
            <div className="review-restaurant-box">
                <h2 className="restaurant-name">{details.name}</h2>
                <p className="restaurant-box-details"><strong>Cuisine: </strong> {details.cuisine}</p>
                <p className="restaurant-box-details"><strong>Address: </strong> {address}</p>
                <div className="restaurant-box-links">
                    {props.user?
                    (<Link to={`/reviews/add-edit/${id}`} className="review-buttons">Add reviews</Link>):
                    (<Link to={`/login`} className="review-buttons">Login to add review</Link>)
                    }
                </div>
            </div>)
    }
    function returnRev(reviews) {
        console.log(reviews)
        return (
            reviews.length === 0 ?
                (<div>No reviews</div>) :
                (<div className="review-list">
                    {reviews.map((review, index) => {
                        let date= new Date(review.date)
                        return (<div key={review._id} className="review-box">
                            <p className="review-item-review">{review.review}</p>
                            <p className="review-item"><strong>User: </strong> {review.userInfo.name}</p>
                            <p className="review-item"><strong>Date: </strong> {date.toLocaleString()}</p>
                            {props.user && review.userInfo.userId === props.user.userId &&
                                (<div className="review-edit-delete">
                                    <Link className="buttons"
                                        to={"/reviews/add-edit/" + id}
                                        state= {{currentReview: review}}>
                                        Edit
                                    </Link>
                                    <button className="buttons" onClick={() => { deleteReview(review._id, index) }} >Delete</button>
                                </div>)}
                        </div>)
                    })}
                </div>)
        )
    }
    return (
        <div>
            {
                (Object.keys(restaurant).length === 0) ?
                    (<div>Loading...</div>) :
                    (<div className="reviewpage-container">
                        {returnRest(restaurant.details)}
                        <br />
                        <h1>Reviews:</h1>
                        {returnRev(restaurant.reviews)}
                    </div>)
            }
        </div>
    )
}