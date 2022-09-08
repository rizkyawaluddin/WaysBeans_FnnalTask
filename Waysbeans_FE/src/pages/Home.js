import React, { useContext, useState } from "react";
// import {Card, Container, Row, Col} from 'react-bootstrap';
import Waves from "../assets/img/Waves.png"
import bannerCoffe from "../assets/img/bannerCoffe.png"
import Icon from "../assets/img/Icon.png"

import Navbar from '../components/navbar/Navbar'
import CardHome from '../components/card/CardHome'
import { UserContext } from "../context/UserContext";


export default function Home() {
    const [state] = useContext(UserContext);

    // modal login
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(true);

    return (
        <>
        <Navbar />
        <div className="box-content position-relative">

            <div className="box-content-header">
                <div className="d-flex p-5">
                    <div className="d-flex flex-column">
                        <img src={Icon} alt="wbheaderlogo" className="img-fluid" width={478} height={145}/>
                        <p className="content-slogan my-2" style={{ fontSize: 25 }}>BEST QUALITY COFFEE BEANS</p>
                        <p className="content-slogan my-2" style={{ fontSize: 18 }}>Quality freshly roasted coffee made just for you.<br />Pour, brew and enjoy</p>
                    </div>
                    <div className="d-flex align-items-end">
                        <img src={Waves} alt="wbheaderlogo" className="img-fluid position-absolute mt-5" width={352} height={99} style={{ top: 240, }}/>
                        <img src={bannerCoffe} alt="wbilogo" className="img-fluid position-absolute" width={440} height={272} style={{ top: 20, right: 26 }}/>
                    </div>
                </div>
            </div>

        </div>

        <div className='list-card mx-auto p-5'>
        <CardHome />
        </div>
        </>
    )
}
