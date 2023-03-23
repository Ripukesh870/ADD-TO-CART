// import { padding } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD ,REMOVE} from './redux/action/action'


function CardDetails() {
  const dispatch = useDispatch();
  const { id } = useParams()
  const history = useNavigate();
  const [data, setdata] = useState([])
  const getdata = useSelector((state) => state.cartreducer.carts);



  const compare = () => {
    const comparedata = getdata.filter((e) => {
      return e.id == id;
    })
    setdata(comparedata)
  }

  useEffect(() => {
    compare();
  }, [id])

  const send = (e) => {
    dispatch(ADD(e));
  }

  const remove =(item)=>{
    dispatch(REMOVE(item));
  }

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  }


  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Item Detials page</h2>
      </div>
      <section className="container mt-3 d-flex" style={{ width: "60rem", backgroundColor: "gray" }}>
        <div className="itemsdetials d-flex">
          {
            data.map((ele) => {
              return (
                <>
                  <img src={ele.imgdata} alt="" style={{ width: "22rem", padding: "10px" }} />

                  <div className="detials " style={{ margin: "3rem" }}>
                    <tr>
                      <td>
                        <p><strong>Restaurant</strong> : {ele.rname}s</p>
                        <p><strong>Price</strong> : ₹ {ele.price}</p>
                        <p><strong>Dishes</strong> : {ele.address}</p>
                        <p><strong>total</strong> : ₹ {ele.price * ele.qnty}</p>
                        <div className="mt-5 d-flex justify-content-between align-item-center" style={{ width: 100, cursor: "pointer", background: "white" }}>
                          <span style={{ fontSize: 24 }} onClick={ele.qnty<=1? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                          <span style={{ fontSize: 24 }}>{ele.qnty}</span>
                          <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                        </div>
                      </td>
                      <td>
                        <p><strong>Rating : </strong><span style={{ background: "green", color: "fff" }}> {ele.rating} ★</span></p>
                        <p><strong>Oreder Review : </strong><span> {ele.somedata} </span></p>
                        <p><strong>Remove :  </strong><span><i className='fas fa-trash' style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => dlt(ele.id)}></i></span ></p>
                      </td>
                    </tr>
                  </div>
                </>
              )
            })
          }

        </div>
      </section>-
    </>
  )
}

export default CardDetails;
