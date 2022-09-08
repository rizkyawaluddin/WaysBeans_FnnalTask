import React, {useContext, useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../../assets/img/logoNav.svg";
import Basket from "../../assets/img/basket.svg";
import { Link } from "react-router-dom";
import ModalAuth from '../auth/ModalAuth'
import Dropdown from "../navbar/Dropdowns"
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';
import { UserContext } from '../../context/UserContext';

import { API } from '../../config/api'

export default function Navbarr({show, setShow}) {
    const [state] = useContext(UserContext)
    console.log(state)
    const isLogin = state.isLogin

    const [counter, setCounter] = useState([]);

    useEffect( () => {

        const findCounter = async () => {
            try {
                let response = await API.get("/transaction-status")
                setCounter (response.data.data.carts.length)
            } catch (e) {
                console.log(e.message)
            }
    }
    findCounter()
    },[]);


return (
    <Navbar className="d-flex justify-content-between shadow-lg px-5 bg-white">
        <div>
            <Link to={state.user.status === "admin" ? "/transaction" : "/"}>
                <img src={Logo} alt="logo" className='navabarLogo'/>
            </Link>
        </div>

        {isLogin ? (
            <div className='navbarRight'>
            <div  className={counter === undefined? "d-none": counter === 0? "d-none": "circle"}>
            {counter}
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                <Link to={'/cart'}>
                    <img src={Basket} alt="cart" className={
                            state.user.status === "customer" ? "navbarCart": "d-none"
                            }/>
                </Link>
                </div>
                <div className='ms-2'>
                    <Dropdown/>
                </div>
            </div>
        </div>

        ) : (
            <div className='navbarRight'>
                <ModalAuth show={show} setShow={setShow}/>
            </div>
        )}
        
    </Navbar>
)
}