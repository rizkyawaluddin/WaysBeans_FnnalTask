//Depedencies
import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { UserContext }  from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

//assets
import IconProfile from '../../assets/img/iconProfile.svg'
import IconLogout from '../../assets/img/iconLogout.svg'
import User from '../../assets/img/user.svg'
import IconAddProduct from '../../assets/img/IconAddProduct.svg'

export default function Dropdowns() {
const [state, dispatch] = useContext(UserContext);
const status = state.user.status;
const navigate = useNavigate();
console.log(state.user.status)
const logout = () => {
    dispatch({
    type: "LOGOUT",
    });
    navigate("/");
};

    return (
        <NavDropdown
        title={<img src={User} alt="photoProfile" className="navbarPhoto" />}
        className="navImg"
        >
        <NavDropdown.Item className={state.user.status === "customer" ? "" : "d-none"}>
            <Link to="/profile" className="navbarItem navbarProfile dropdownText d-flex justify-content-between align-items-center">
                <img src={IconProfile} alt="profile" className="d-flex dropdown-img" />
                <p className="d-flex mb-0 dropCust tagProfile">Profile</p>
            </Link>
        </NavDropdown.Item >

        <NavDropdown.Item
            className={status === "admin" ? "mb-2 mt-2 ps-3" : "d-none"}
        >
        <Link to="/add-product" className="navbarItem d-flex dropdownText align-items-center">
            <img
                src={IconAddProduct}
                alt="AddProduct"
                className="d-flex dropdown-img"
            />
            <p className="d-flex mb-0 ps-3 dropAdmin">Add Product</p>
        </Link>
        </NavDropdown.Item>

        <NavDropdown.Item
            className={status === "admin" ? "mb-2 mt-2 ps-3" : "d-none"}
        >
            <Link to="/list-product" className="navbarItem d-flex dropdownText align-items-center">
                <img
                src={IconAddProduct}
                alt="AddToping"
                className="d-flex dropdown-img navAddTopping"
                />
                <p className="d-flex ps-3 mb-0 dropAdmin ">List Product</p>
            </Link>
        </NavDropdown.Item>
        {/* <NavDropdown.Item>
        <div className={state.user.status === "customer" ? "d-none" : ""}>
            <Link to="/profile" className="navbarItem navbarProfile dropdownText d-flex justify-content-between align-items-center">
                <img src={IconProfile} alt="profile" className="d-flex dropdown-img" />
                <p className="d-flex mb-0 dropCust tagProfile">Profile</p>
            </Link>
        </div>
        </NavDropdown.Item> */}
        <hr />
        <NavDropdown.Item onClick={logout}>
            <img src={IconLogout} alt="logout" className="d-flex dropdown-img" />
            <p className="d-flex mb-0 dropCust pe-4">Logout</p>
        </NavDropdown.Item>
    </NavDropdown>
)
}
