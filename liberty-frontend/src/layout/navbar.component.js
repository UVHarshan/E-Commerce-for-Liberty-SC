import { Link, useHistory } from 'react-router-dom';
import CartPreview from "./CartPreview";
import { useEffect, useState } from "react";
import { API } from "../services/RESTService";

export default function Navbar() {
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [userType, setUserType] = useState("undefined");

    const userTypeFind = () => {
        if (JSON.parse(localStorage.getItem("liberty-store-userData")) === null) {
            return "undefined";
        } else {
            return JSON.parse(localStorage.getItem("liberty-store-userData")).userType
        }
    }
    useEffect(async () => {
        setUserType(userTypeFind());
        const products = await API.GET('products', "", null);
        setCategories([...new Set(products.map(item => item.category))]);
    }, [isClicked, userType])

    const renderDropDown = () => {
        return categories.map((item, index) =>
            <li key={index}><Link to={"/category/" + item.toLowerCase()} className="dropdown-item"> {item} </Link></li>)
    }

    async function logout() {
        localStorage.removeItem("liberty-store-userData");
        setUserType("undefined");
        history.push("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Liberty Super</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"
                                onClick={() => setIsClicked(!isClicked)}>Categories</Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">{renderDropDown()}</ul>
                        </li>
                        {
                            (userType === "admin" || userType === "cashier") ?
                                <li className="nav-item"><Link to="/shop" className="nav-link"> Shop </Link></li> :
                                <li className="nav-item"><Link to="/checkout" className="nav-link"> Checkout </Link>
                                </li>
                        }
                    </ul>

                    {
                        (userType === "admin" || userType === "cashier") &&
                        <button className="btn btn-outline-secondary px-3 py-1 mr-3" type="submit"
                            onClick={logout}> Logout</button>
                    }
                    {
                        (userType === "undefined") &&
                        <Link to="/login" className="nav-link">
                            <button className="btn btn-outline-secondary px-4 py-1" type="submit">LogIn
                            </button>
                        </Link>
                    }{
                        (userType === "customer") &&
                        <>
                            <span className="dropdown nav-item">
                                <Link to="" className="nav-link dropdown-toggle text-secondary" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setIsClicked(!isClicked)}>
                                    <i className="feather-user" /> user</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className="nav-item"><Link to="/my-profile" className="nav-link"> My Profile </Link></li>
                                    <li className="nav-item"><Link to="/my-orders" className="nav-link"> My Orders </Link></li>
                                    <li className="nav-item"><Link to="/faq" className="nav-link"> FAQ </Link></li>
                                    <li className="nav-item"><Link to="/offers" className="nav-link"> Offers </Link></li>
                                    <li className="nav-item text-center">
                                        <button className="btn btn-outline-secondary px-5 py-1" type="submit"
                                            onClick={logout}> Logout</button>

                                    </li>
                                </ul>
                            </span>
                            <CartPreview />
                        </>}

                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" >Search</button>
                    </form>                
                </div>
            </div>
        </nav>
    )
}
