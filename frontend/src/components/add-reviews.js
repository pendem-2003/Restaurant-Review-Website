import React from "react";
import { useNavigate,useParams,useLocation } from "react-router-dom";
import Api from "../services/api-requests";

export default function AddReviews(props){
    const { id } = useParams()
    const navigate= useNavigate()
    const location= useLocation()
    let editing= false
    let currentReview=""
    let currentReviewId=""
    if(location.state&& location.state.currentReview){
        editing= true
        currentReview= location.state.currentReview.review
        currentReviewId= location.state.currentReview._id
    }
    const [review,setReview]= React.useState(currentReview)

    function editReview(){
        let data= {
            reviewId: currentReviewId,
            name: props.user.userName,
            userId: props.user.userId,
            review:review
        }
        Api.put(data)
        .then(res=>{
            console.log(res)
            navigate(`/reviews/${id}`)
        })
        .catch(e=> console.log("Error updating review"+e))
    }
    function addReview(){
        let data={
            restaurant_id: id,
            name: props.user.userName,
            userId: props.user.userId,
            review:review
        }
        Api.post(data)
        .then(res=>{
            console.log(res)
            navigate(`/reviews/${id}`)
        })
        .catch(e=> console.log("Error adding review"+e))
    }
    function handleInput(event){
        setReview(event.target.value)
    }
    function handleReview(event){
        event.preventDefault()
        editing===true? editReview(): addReview()
    }
    return(
        <div className="container">
            <form className="login-flex" onSubmit={handleReview}>
                <h2>Write a review</h2>
                <textarea
                    className="review-input"
                    onChange={handleInput}
                    value={review}
                    placeholder=""
                    name="review"
                />
                <button className="buttons">Submit</button>
            </form>

        </div>
    )
}