import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import img from "../assets/images/loading.gif"
import { API } from "../services/RESTService";

export default class ProductViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productImg: img,
            itemName: "Item Name",
            brandName: "Brand name",
            price: "00",
            redirect: false

        }
    }

    async componentDidMount() {
        const products = await API.GET('products', "", null);

        let selectedProduct = products.filter(product =>
            product._id === window.location.href.split("product/")[1])[0];

        console.log(selectedProduct)

        if (selectedProduct !== undefined) {
            this.setState({
                productImg: selectedProduct.image,
                itemName: selectedProduct.item,
                brandName: selectedProduct.brand,
                price: selectedProduct.price
            });
        } else {
            this.setState({ redirect: true })
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div className="container  py-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-primary px-4 mt-4"><i className="feather-chevrons-left" /> Back to
                        Home
                    </button>
                </Link>

                <div className="dashboard-card card my-5">
                    <div className="row py-3">
                        <div className="col-12 col-sm-6">
                            <img src={this.state.productImg} className="img-fluid" alt={"ss"} />
                        </div>
                        <div className="col-12 col-sm-6 pt-4">
                            <h1>{this.state.itemName}</h1>
                            <h2>{this.state.brandName}</h2><br />
                            <h2>Rs. {this.state.price}.00</h2>

                        </div>
                    </div>
                </div>


            </div>

        );
    }
}
