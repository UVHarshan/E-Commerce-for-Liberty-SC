import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {

    render() {
        return (
            <nav id="sidebar" className=" sidebar">
                <Link to="" className="navbar-brand">
                    <img src="" alt="" className="logo" />
                </Link>
                <ul className="nav flex-column vertical-nav">
                    <li className="nav-item">
                        <Link to="/shop/" className="nav-link active" aria-current="page"
                            href=""><i className="feather-airplay" />  Dashboard</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/shop/add-category" className="nav-link"><i className="feather-server" />  Add Categories</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/shop/product-category-list" className="nav-link"><i className="feather-layers" />  Manage Categories</Link>
                    </li>
                    
                   
                   
                   
                    <li className="nav-item">
                        <Link to="/shop/add-bill" className="nav-link"><i className="feather-trending-up" />  Manage Sales</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop/add-user" className="nav-link"><i className="feather-user-plus" />  Add Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop/user-list" className="nav-link"><i className="feather-users" />  Manage Employees</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/shop/add-product" className="nav-link"><i className="feather-log-in" />  Add Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop/product-list" className="nav-link"><i className="feather-package" />  Manage Products</Link>
                    </li>



                    <li className="nav-item">
                        <Link to="/shop/add-supplier" className="nav-link"><i className="feather-user-plus" />  Add Suppliers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop/send-order" className="nav-link"><i className="feather-navigation" />  Send Order</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop/report" className="nav-link"><i className="feather-pie-chart" />  Analytics</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop/power-bi" className="nav-link"><i className="feather-file-text" />  Reports</Link>
                    </li>                   
                  
                </ul>
            </nav>
        );
    }
}
