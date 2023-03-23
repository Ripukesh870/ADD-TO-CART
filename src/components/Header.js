import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import {DLT} from './redux/action/action'
// import MenuItem from '@mui/material/MenuItem';
import empty from './img/empty.gif'
function Header() {
    const [price,setprice]=useState(0);
    const getdata = useSelector((state) => state.cartreducer.carts);
    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const color = {
        color: "black",
        textDecoration: "none",
        fontSize: "20px"
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt=(id)=>{
        dispatch(DLT(id))
    }


    const total=()=>{
        let price=0;
        getdata.map((ele,k)=>{
            price=ele.price * ele.qnty +price;
        });
        setprice(price)
    }
    useEffect(()=>{
        total();
    },[total])


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light" style={{ height: "60px" }}>
                <div className="container">
                    <NavLink style={color} className="mx-3 " to="./">Add To Card</NavLink>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <NavLink style={color} className="active" aria-current="page" to="/">Home</NavLink>
                    </div>
                    <Badge badgeContent={getdata.length} color="secondary" style={{ marginRight: "40px" }}
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-sharp fa-solid fa-cart-shopping" style={{ fontSize: "25px", cursor: "pointer" }}></i>
                    </Badge>

                </div>

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >

                    {
                        getdata.length ?
                            <div className="card_detials" style={{ width: "23rem", padding: 10 }}>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurent Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e,id) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                    <img src={e.imgdata} alt="" style={{ width: "6rem", height: "5rem" }} />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price : ₹ {e.price}</p>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer"}} onClick={()=>dlt(e.id)}>
                                                                    <i className='fas fa-trash smalltrash'></i>
                                                                </p>
                                                            </td>
                                                            <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(e.id)}>
                                                                <i className='fas fa-trash largetrash'></i>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'><strong> Total : ₹ {price}</strong></p>
                                    </tbody>
                                </table>
                            </div> :
                            <div className='card_detials d-flex ' style={{ width: "22rem", padding: 10, position: "relative" }}>
                                <i className='fas fa-close smallclose' style={{ position: "absolute", top: "2", right: 20, cursor: "pointer" }} onClick={handleClose} ></i>
                                <p style={{ fontSize: 22, marginLeft: "15px", marginTop: "25px" }}>Your card is empty</p>
                                <img className='emptycart_img' style={{ width: "5rem", padding: 10 }} src={empty} alt="" />
                            </div>
                    }
                </Menu>
            </nav>
        </>
    )
}

export default Header
