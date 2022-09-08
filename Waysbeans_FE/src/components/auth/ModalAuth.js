import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {Modal, Form} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { UserContext } from '../../context/UserContext';

import { useMutation } from 'react-query';
import { API } from '../../config/api';



function ModalAuth() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [shows, setShows] = useState(false);

    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);

    const handleSwitchRegister = () =>{
    setShow(false)
    setShows(true)
};

const handleSwitchLogin = () => {
    setShows(false);
    setShow(true);
};


// ____________register
const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    e.preventDefault();

    // Configuration Content-type
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Data body
    const body = JSON.stringify(register);

    // Insert data user to database
    await API.post("/register", body, config);

    // Handling response here
    setShows(false);
  });

   // _________login
   const [state, dispatch] = useContext(UserContext);
   const [form, setForm] = useState({
     email: "",
     password: "",
   });
 
   //
   const handleChange = (e) => {
     setForm({
       ...form,
       [e.target.name]: e.target.value,
     });
   };
 
   const handleSubmit = useMutation(async (e) => {
     try {
       e.preventDefault();
 
       const config = {
         headers: {
           "Content-type": "application/json",
         },
       };
 
       const body = JSON.stringify(form);
 
       const response = await API.post("/login", body, config);
 
       dispatch({
         type: "LOGIN_SUCCESS",
         payload: response.data.data,
       });
 
       setShow(false);
     } catch (error) {
       console.log(error);
     }
   });


return (
    <>
        <>
            <Button className='btnLogin text-danger' onClick={handleShow}>
                Login
            </Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="header-login mb-4">
                        <p className='mt-4 ms-3'>Login</p>
                    </div>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="email-input ms-3">
                        <Form.Control
                            type="email"
                            className="inputAuth p-2"
                            placeholder="Email"
                            name="email"
                            id="emailInput"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="password-input ms-3 mt-3">
                        <Form.Control
                            type="password"
                            className="inputAuth p-2"
                            placeholder="Password"
                            name="password"
                            id="passwordInput"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="btn-login ms-3">
                        <button type='submit' onClick={handleSubmit}>Login</button>
                    </div>
                </form>
                    <div className="footer mt-3">
                        <p className='tx-modal'>
                            Don't have account ? Click <b onClick={handleSwitchRegister}>Here</b>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
        <>
        <Button className='btnRegister text-white ms-2' onClick={handleShows}>
            Register
        </Button>
    
        <Modal show={shows} onHide={handleCloses}>
            <Modal.Body>
                <div className="header-login mb-4">
                    <p className='mt-4 ms-3'>Register</p>
                </div>
                <form  onSubmit={(e) => handleSubmitRegister.mutate(e)}>
                <div className="email-input ms-3">
                    <Form.Control
                        type="email"
                        id="emailInput"
                        name="email"
                        placeholder='Email'
                        onChange={handleChangeRegister}
                    />
                </div>
                <div className="password-input ms-3 mt-3">
                    <Form.Control
                        type="password"
                        id="passwordInput"
                        name="password"
                        placeholder='Password'
                        onChange={handleChangeRegister}
                    />
                </div>
                <div className="fullname-input ms-3 mt-3">
                    <input
                        type="text"
                        id="fullnameInput"
                        name="name"
                        placeholder='Full Name'
                        onChange={handleChangeRegister}
                    />
                    </div>
                    <div className="btn-login ms-3">
                        <button type='submit'>Register</button>
                    </div>
                    </form>
                    <div className="footer mt-3">
                        <p className='tx-modal'>
                            Already have an account ? Click <b onClick={handleSwitchLogin}>Here</b>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    </>
    );
}

export default ModalAuth;