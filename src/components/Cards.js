import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import CardsData from './CardData'
import {ADD} from './redux/action/action'
// import { Button } from 'bootstrap';
// import CardDetails from './CardDetails'
// import Card from 'react-bootstrap'
function Cards() {
    const [data, setdata] = useState(CardsData);
    const dispatch=useDispatch();


    const send=(e)=>{
        // console.log(e);
        dispatch(ADD(e));
    }


    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Add to cart </h2>
            <div className="row d-flex justify-content-center alige-items-center">
                {
                    data.map((element, id) => {
                        return (
                            <> 
                                <div className="card mx-2 mt-3" style={{ width: "22rem" , border:"none" , backgroundColor:"#D8D8D8"}}>
                                    <img src={element.imgdata} className="card-img-top mt-3" alt="..." style={{height:"16rem"}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{element.rname}</h5>
                                        <p className="card-text">Price : ₹ {element.price}</p>
                                        <button className='col-lg-12 btn' style={{backgroundColor:"blue",color:"white"}} onClick={()=>send(element)}>Add To Card</button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards
