import React, {Component} from 'react';
import {API} from "../services/RESTService";
import Products from "../components/Products";
import {Link} from "react-router-dom";

export default class CategoryViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    async componentDidMount() {
        const products = await API.GET('products', "", null);
        this.setState({products: products});
    }

    render() {
        return (
            <div className="container py-5">
                <Link to={"/"}>
                    <button className="btn btn-outline-primary px-4 mt-4">
                        <i className="feather-chevrons-left"/> Back to Home
                    </button>
                </Link>
                {
                    <Products products={this.state.products}
                              category={window.location.href.split("category/")[1].charAt(0).toUpperCase() +
                              window.location.href.split("category/")[1].slice(1)}
                    />
                }
            </div>


        );
    }
}
