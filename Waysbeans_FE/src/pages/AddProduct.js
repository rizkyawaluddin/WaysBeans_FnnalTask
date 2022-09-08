import {Form, Button} from 'react-bootstrap';
import React, { useState } from "react";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import FileImg from '../assets/img/Thumbnail.png';
import Navbar from '../components/navbar/Navbar';

import { API } from '../config/api';

const AddProduct = () => {

    const [previewName, setPreviewName] = useState(""); //name
  const [preview, setPreview] = useState(null); //image

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    stock: ""
  }); //Store product data

  //handle chahnge data on from
  const handleChange = (e) => {  
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("name", form.name); 
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("stock", form.stock);

      console.log(form)
      // Insert category data
      const response = await API.post('/product', formData, config);
      console.log(response);


      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });
    
    return (
        <>
        <Navbar/>
        <div className=" container cAddProduct d-flex justify-content-center align-items-center mt-5" id="add-product">
            <div className='add'>
            <div className="left-side col-7">
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="tx-product mt-5 mb-5">
                    <h1>Product</h1>
                </div>
                <Form.Group>
                    <Form.Control
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name Product"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <Form.Control
                        id="stock"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <Form.Control
                        id="price"
                        type="number"
                        name="price"
                        placeholder="Price"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    <textarea
                        id="desc"
                        type="textarea"
                        name="desc"
                        placeholder="Description"
                        className='input mb-3'
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <input
                        type="file"
                        id="addProductImage"
                        hidden
                        className="photoProduct"
                        name="image"
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="addProductImage"
                        className={previewName === "" ? "addProductImage" : "previewName"}
                        >
                        {previewName === "" ? "Photo Product" : previewName}
                        <img src={FileImg} alt="paperClip" />
                    </label>
                    <div className="d-grid gap-2">
                        <Button type='submit' className="btn-product mx-auto">
                        Add Product
                        </Button>
                    </div>
                </Form>
            </div>
            </div>
                    {preview && (
                    <div className="addProductRight">
                        <img  src={preview} alt="preview" className='mt-5'/>
                    </div>
                    )} 
        </div>
        </>
    )
}

export default AddProduct