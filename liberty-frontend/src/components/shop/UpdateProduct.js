import React, { Component } from 'react';
import { API } from "../../services/RESTService";
import DatePicker from "react-datepicker";
import { Redirect } from "react-router-dom";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";

export default class UpdateProduct extends Component {
    constructor(props) {
        super(props);

        // Method Binding
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            brand: "",
            item: "",
            category: "",
            price: "",
            quantity: "",
            expiryDate: new Date(),
            redirect: false,

        };
    }


    componentDidMount() {
        API.GET("products/" + this.props.match.params.id)
            .then(response => {


                console.log(response)
                this.setState({
                    brand: response.brand,
                    item: response.item,
                    category: response.category,
                    price: response.price,
                    quantity: response.quantity,
                    expiryDate: response.expiryDate
                })
            })
            .catch((error) => {
                console.log(error);
            })

        console.log(this.state)
    }

    onChangeBrand(e) {
        this.setState({
            brand: e.target.value,
        });
    }

    onChangeItem(e) {
        this.setState({
            item: e.target.value,
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value,
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const product = {
            brand: this.state.brand,
            item: this.state.item,
            category: this.state.category,
            price: this.state.price,
            quantity: this.state.quantity,
            expiryDate: this.state.expiryDate
        };

        console.log(this.state);

        await API.POST("products/update/" + this.props.match.params.id, product);

        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Updated the product successful',
            showConfirmButton: false,
            timer: 1800
        });

        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/shop/product-list' />
        }
        if (JSON.parse(localStorage.getItem("liberty-store-userData")) === null
            || JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "admin") {
            return (
                <WarningPage />
            )
        }
        return (
            <div className="card dashboard-card">
                <h1 className="text-center mb-3 h2">Update Product</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="mb-3 col-12 col-lg-5">
                            <label htmlFor="exampleInputBrand" className="form-label"> Brand</label>
                            <input type="text" className="form-control" id="exampleInputBrand" value={this.state.brand}
                                onChange={this.onChangeBrand} aria-describedby="brandHelp" />
                        </div>
                        <div className="mb-3 col-12 col-lg-7">
                            <label htmlFor="exampleInputBrand" className="form-label"> Item </label>
                            <input type="text" className="form-control" id="exampleInputBrand" value={this.state.item}
                                onChange={this.onChangeItem} aria-describedby="brandHelp" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputCategory" className="form-label"> Category </label>
                        <input type="text" className="form-control" id="exampleInputCategory"
                            value={this.state.category} onChange={this.onChangeCategory}
                            aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPrice" className="form-label"> Price </label>
                        <input type="text" className="form-control" id="exampleInputPrice" value={this.state.price}
                            onChange={this.onChangePrice} aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputDescription" className="form-label">Total Quantity </label>
                        <input type="text" className="form-control" id="exampleInputDescription"
                            value={this.state.quantity} onChange={this.onChangeQuantity}
                            aria-describedby="brandHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label d-block"> Expiry Date </label>
                        <DatePicker
                            className="form-control w-100 float-end"
                            selected={new Date(this.state.expiryDate)}
                            onChange={e => this.setState(
                                {
                                    expiryDate: e
                                })}
                        />
                        {console.log(this.state)}

                    </div>

                    <button type="submit" className="btn btn-primary w-100 float-end">Update the Product</button>
                </form>
            </div>
        );
    }
}
