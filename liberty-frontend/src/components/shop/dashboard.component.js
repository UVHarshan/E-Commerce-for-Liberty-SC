import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { API } from "../../services/RESTService";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categoriesCount: 0,
            cusCount: 0,
            orderCount: 0,
        }
        console.log(this.state)
    }

    async componentDidMount() {
        const products = await API.GET('products', "", null);
        const categories = [...new Set(products.map(item => item.category))];
        let ar = [];
        for (const arElement of categories) {
            ar.push([...products.filter(product => product.category === arElement)].length);
        }

        const customers = await API.GET("customers");
        const orderCount = await API.GET("sales/order-count")

        this.setState({ cusCount: customers.length, categoriesCount: categories.length, orderCount: orderCount, products: products });
    }


    render() {
        return (
            <div>
                <div className="d-flex flex-row flex-wrap justify-content-center py-5">
                    <div className="d-card p-3">
                        <span><p className="circle-d">{this.state.products.length}</p>Products
                            <i className="feather-package" /></span>
                        <hr />
                        <Link to="/shop/product-list">
                            <p className="view-more">view Details <i className="feather-chevrons-right" /></p>
                        </Link>
                    </div>

                    <div className="d-card p-3">
                        <span><p className="circle-d">{this.state.cusCount}</p>Customers
                            <i className="feather-users" /></span>
                        <hr />
                        <Link to="/shop/customer-list">
                            <p className="view-more">view Details <i className="feather-chevrons-right" /></p>
                        </Link>
                    </div>

                    <div className="d-card p-3">
                        <span><p className="circle-d">{this.state.categoriesCount}</p>Product Categories
                            <i className="feather-layers" /></span>
                        <hr />
                        <Link to="/shop/product-category-list">
                            <p className="view-more">view Details <i className="feather-chevrons-right" /></p>
                        </Link>
                    </div>

                    <div className="d-card p-3">
                        <span><p className="circle-d">{this.state.orderCount}</p>Orders
                            <i className="feather-shopping-cart" /></span>
                        <hr />
                        <Link to="/shop/order-list">
                            <p className="view-more">view Details <i className="feather-chevrons-right" /></p>
                        </Link>
                    </div>

                </div>


            </div>
        );
    }
}
