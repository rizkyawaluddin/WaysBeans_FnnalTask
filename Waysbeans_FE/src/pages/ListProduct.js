import {Table, Button, Container} from 'react-bootstrap';
import React, { useState, useEffect} from 'react';
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DummyIncomeTransaction from '../components/datadummy/Income';
import DeleteData from "../components/modal/Delete";
// import ModalTransaction from "../components/modal/ModalTransaction";
import Rp from "rupiah-format";
import Navbar from "../components/navbar/Navbar";
import { API } from "../config/api";



function List() {
    let { data: products, refetch } = useQuery("productCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
      });

      let navigate = useNavigate();
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleDelete = (id) => {
        handleShow();
        setIdDelete(id);
      };

      const deleteById = useMutation(async (id) => {
        // memastikan apakah datanya bisa di delete atau tidak
        try {
          await API.delete("/product/" + id);
          refetch();
        } catch (error) {
          console.log(error);
        }
      });
    //   untuk mounting data
      useEffect(() => {
        if (confirmDelete) {
          handleClose();
          deleteById.mutate(idDelete);
          setConfirmDelete(null);
        }
      }, [confirmDelete]);
    
      //Update Product
      const handleUpdate = (id) => {
        navigate("/update-product/" + id);
      };

    return(
        <>
        <Navbar/>
        <Container>
            <div className="mt-3 px-5">
                <h3 className="colorPrimary mb-4">List Product</h3>
                <Table hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* MAPPING */}
                    {products?.map((item, index) => (
                            <tr>
                            <td></td>
                            <td><img src={item?.image} style={{ width: "40px", height: "40px",objectFit: "cover",}} alt="" /></td>
                            <td>{item?.name}</td>
                            <td>{item?.stock}</td>
                            <td className="tdPrice">{Rp.convert(item?.price)}</td>
                            <td>{item?.desc.substring(0, 17)}...</td>
                            <td className="text-center">
                                <Button variant="danger" className="me-1" onClick={() => {
                                handleDelete(item.id)}}>Delete</Button>
                                <Button variant="success" className="ms-1" onClick={() => {
                                handleUpdate(item.id);}}>Update</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}/>
        </Container>
        </>
    )
}

export default List