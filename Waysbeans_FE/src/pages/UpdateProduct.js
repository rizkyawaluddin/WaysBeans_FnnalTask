import {Form, Button} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import FileImg from '../assets/img/Thumbnail.png';
import Navbar from '../components/navbar/Navbar';

import { API } from "../config/api";



const UpdateProduct = () => {

    let navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({});
  const [previewName, setpreviewName] = useState("");
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    desc: "",
    image: "",
  });

  useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      nama: response.data.data.name,
      stock: response.data.data.stock,
      price: response.data.data.price,
      desc: response.data.data.desc,
    });
    setProduct(response.data.data);
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("name", form.name);
      formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("desc", form.desc);

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

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
                <h1>Update Product</h1>
            </div>
            <Form.Group>
                <Form.Control
                    id="input"
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Name Product"
                    className='input mb-3'
                    onChange={handleChange}
                />
                <Form.Control
                    id="input"
                    type="text"
                    name="stock"
                    value={form.stock}
                    placeholder="Stock"
                    className='input mb-3'
                    onChange={handleChange}
                />
                <Form.Control
                    id="input"
                    type="number"
                    name="price"
                    value={form.price}
                    placeholder="Price"
                    className='input mb-3'
                    onChange={handleChange}
                />
                <textarea
                    id="input"
                    type="textarea"
                    name="desc"
                    value={form.desc}
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

export default UpdateProduct