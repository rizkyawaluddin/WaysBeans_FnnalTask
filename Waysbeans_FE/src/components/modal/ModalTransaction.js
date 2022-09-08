import React from "react";
import { Modal } from "react-bootstrap";
import QRCode from 'react-qr-code'
import CoffeeTransaction from '../../assets/img/RectangleTransaction.png'


export default function ModalTransaction({showTransaction, close}) {
return (
    <Modal show={showTransaction} onHide={close}>
        <div>
                <div className='color3 cardTransaction'>
                    <div className='childCardTransaction'>
                        <div>
                            <div className='d-flex'>
                                <div className='me-2'>
                                    <img src={CoffeeTransaction} alt="coffee"/>
                                </div>
                                <div>
                                    <div>
                                        <h5 className='f14 colorPrimary fw-bold'>Ice Coffe Palm Sugar</h5>
                                        <p className='f9 colorPrimary'><span className='fw-bold'>Saturday</span>, 5 March 2020</p>
                                    </div>
                                    <div>
                                        <h6 className='f10 colorPrimary'><span className='colorSecondary'>Toping</span> : Bill Berry Boba, Bubble Tea Gelatin</h6>
                                        <p className='f10 colorSecondary'>Price : Rp.33.000</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='me-2'>
                                    <img src={CoffeeTransaction} alt="coffee"/>
                                </div>
                                <div>
                                    <div>
                                        <h5 className='f14 colorPrimary fw-bold'>Ice Coffe Palm Sugar</h5>
                                        <p className='f9 colorPrimary'><span className='fw-bold'>Saturday</span>, 5 March 2020</p>
                                    </div>
                                    <div>
                                        <h6 className='f10 colorPrimary'><span className='colorSecondary'>Toping</span> : Bill Berry Boba, Bubble Tea Gelatin</h6>
                                        <p className='f10 colorSecondary'>Price : Rp.33.000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='statusCardTransaction'>
                           
                            <div className='mb-2'>
                                <QRCode value='test' bgColor='transparent' size={74}/>
                            </div>
                            <span className='bgStatusBlue mb-2'>
                                <p className='fColorBlue f10'>On The Way</p>
                            </span>
                            <div>
                                <h6 className='fw-bold f10 colorSecondary'>Sub Total : 69.000</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </Modal>
)
}
