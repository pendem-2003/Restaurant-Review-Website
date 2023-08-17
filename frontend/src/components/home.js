import React from "react";
import Api from "../services/api-requests";
import { Link } from "react-router-dom";
import "../styles/home.css"

export default function Home() {
    const [rsts, setRsts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [searchName, setName] = React.useState("");

    React.useEffect(() => {
        search()
    }, [page])

    function setSearchName(val){
        setName(val.target.value)
    }
    function search(pageNum=page) {
        if(pageNum===0){
            setPage(0)
        }
        Api.find(searchName,pageNum)
            .then(props => {
                console.log(props.data);
                setRsts(props.data.documents);
            })
            .catch(e=>{
                console.log(e)
            })
    }
    

    function prevPage() {
        setPage(value => {
            let ans = value - 1 >= 0 ? value - 1 : value
            return ans
        });
    }
    function nextPage() {
        setPage(value => value + 1);
    }
    return (
        <div className="vertical-flex">
            <div className="searchbar">
                <input className="search-input" placeholder="Search" value={searchName} onChange={setSearchName}></input>
                <button className="search-button" onClick={()=>{search(0)}}>
                    <img className="search-image" src="../../search-icon.png" alt="search"></img>
                </button>
            </div>
            <div className="restaurant-list">
                {rsts.map(props => {
                    const address = `${props.address.building} ${props.address.street} ${props.address.zipcode}`;
                    return (
                        <div key={props._id} className="restaurant-box">
                            <h2 className="restaurant-name">{props.name}</h2>
                            <p className="restaurant-box-details"><strong>Cuisine: </strong> {props.cuisine}</p>
                            <p className="restaurant-box-details"><strong>Address: </strong> {address}</p>
                            <div className="restaurant-box-links">
                                <Link 
                                to={"/reviews/"+props._id} 
                                className="buttons"
                                state={{details: props}}
                                >Add reviews</Link>
                                <a 
                                className="buttons" 
                                href={"https://www.google.com/maps/search/" + props.name + " " + address} 
                                target="_blank"
                                rel="noreferrer"
                                > View Map</a>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="page-bar">
                <button className="buttons"onClick={prevPage}>Prev</button>
                <span className="page-number">{page+1}</span>
                <button className="buttons" onClick={nextPage}> Next</button>
            </div>
        </div>
    )
}