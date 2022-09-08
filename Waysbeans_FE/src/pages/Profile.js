import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import ProfileImg from '../assets/img/profile.svg'
import Logo from "../assets/img/logoNav.svg";
import RectangleTransaction from '../assets/img/RectangleTransaction.png'
// import Logo from '../assets/img/logoNav.svg'
import QRCode from 'react-qr-code'
import Navbar from '../components/navbar/Navbar'
import Rp from 'rupiah-format'

import { API } from '../config/api'
export default function Profile() {

    let { data: transaction } = useQuery("traans1", async () => {
        const response = await API.get("/transaction-status");
        return response.data.data;
    });

    let { data: transactions } = useQuery("transCache", async () => {
        const response = await API.get("/transaction1");
        return response.data.data;
    });

    console.log(transaction);
    return (
        <div>
        <Navbar />
        <Container className='mt-5 pt-5'>
            <Row>
            <Col>
            <div>
                <p className='fw-bold fs-2 mb-3 mt-3 ps-5' style={{color:'#613D2B'}}>My Profile</p>
            </div>
            <div className='d-flex ps-5'>
                <img src={ProfileImg} alt='' style={{width:'9rem', borderRadius:'3px'}} />
                <div className='ms-5'>
                <div>
                    <p className='fs-4 fw-bold'>Name :</p>
                    <p>{transaction?.user?.name}</p>
                </div>
                <div>
                    <p className='fs-4 fw-bold'>Email :</p>
                    <p>{transaction?.user?.email}</p>
                </div>
                </div>
            </div>
            </Col>
            <Col>
            <div>
                <div>
                <p className='fw-bold fs-2 mb-3 mt-3 ps-3' style={{color:'#613D2B'}}>My Transaction</p>
                </div>
                <div>
                {transactions?.map((items, index) => (
                        <div>
                            {items?.carts?.map((cart, idx) => (
                            <div className='p-3 between' style={{width:'100%', backgroundColor:'#F6E6DA'}}>
                                <div className='d-flex' >
                                            <img src={"http://localhost:5000/uploads/" + cart?.product?.image} alt='product' style={{width:'30%',height:'80%',borderRadius:'5px'}} />
                                            <div className='ms-3'>
                                                <h5 className='mb-0 colorPrimary fw-bold'>{cart?.product?.name}</h5>
                                                <p className='colorSecondary'><span className='colorPrimary fw-bold'>Saturday, </span> 25 agustus 2022</p>
                                                <p className='mb-0 colorSecondary'>Price : {Rp.convert(cart?.sub_amount)}</p>
                                                <p className='mb-0 colorSecondary'>Qty : 2</p>
                                                <h6 className='mb-0 colorSecondary fw-bold'>Subtotal : {Rp.convert(items?.total)}</h6>
                                            </div>
                                        </div>
                                <div className='flexcolend'>
                                    <img src={Logo} alt='product' style={{width:'50%',borderRadius:'5px'}} className='mb-2' />
                                    <img src={QRCode} alt='product' style={{width:'50%',borderRadius:'5px'}} className='mb-2' />
                                    <p className='completed px-4 py-1' style={{backgroundColor:'#613D2B', color:'white', borderRadius:'3px'}}>{items?.status}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                ))}
                </div>
            </div>
            </Col>
            </Row>
        </Container>
        </div>
    )
}
