import React, { Component } from "react";
import { API } from "../../services/RESTService";
import Select from "react-select";
import Swal from "sweetalert2";

export default class AddBill extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.productList = this.productList.bind(this);
        this.createBill = this.createBill.bind(this);
        this.clearBill = this.clearBill.bind(this);

        this.state = {
            customer: "Customer",
            quantity: 1,
            payoutItem: [],
            netTotal: 0,
            cusPayment: 0,
            change: 0,
            selectedProduct: "",
            products: []
        };
    }

    async componentDidMount() {
        const products = await API.GET('products', "", null);
        this.setState({ products: products });
    }

    productList() {
        return this.state.payoutItem.map((carted, index) => {
            return (
                <tr>
                    <td>{carted.brand}</td>
                    <td>{carted.item}</td>
                    <td className="text-end pr-4">{carted.price}</td>
                    <td className="text-end pr-4">{carted.quantity}</td>
                    <td className="text-end pr-4">{parseInt(carted.price) * parseInt(carted.quantity)}</td>
                </tr>
            )
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.customer === "Customer") {
            Swal.fire('Please add the customer');
            return
        }
        if (this.state.selectedProduct === "") {
            Swal.fire('Please select the product');
            return
        }

        let arr = this.state.payoutItem;
        arr.push({
            brand: this.state.selectedProduct.brand,
            item: this.state.selectedProduct.item,
            price: this.state.selectedProduct.price,
            quantity: this.state.quantity
        });

        this.setState({
            quantity: 1,
            payoutItem: arr,
            selectedProduct: "",
            netTotal: this.state.netTotal + this.state.selectedProduct.price * this.state.quantity,
        });
    }

    async createBill() {
        if (this.state.cusPayment === 0) {
            await Swal.fire('Please add customer payment amount');
            return
        }
        const order = {
            customerId: 'null',
            customerName: this.state.customer,
            deliveryAddress: 'null',
            mobile: 'null',
            total: this.state.netTotal,
            items: this.state.payoutItem,
            orderDate: new Date(),
            issueDate: new Date(),
            paymentMethod: "cash",
            status: "issued"
        };
        await API.POST("sales/add", order);
        this.setState({ payoutItem: [] });
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add Bill successful',
            showConfirmButton: false,
            timer: 1800
        }).then(Array.from(document.querySelectorAll("input")).forEach(input => (input.value = "")));
        this.clearBill();
    }

    clearBill() {
        this.setState({
            customer: "Customer",
            quantity: 1,
            payoutItem: [],
            netTotal: 0,
            cusPayment: 0,
            change: 0
        });
    }

    render() {
        return (
            <div className="card dashboard-card">
                <h1 className="text-center mb-3 h2"> Create Bill </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Customer</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.customer}
                                onChange={e => this.setState({ customer: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Product</label>
                        <div className="col-sm-10">
                            <Select id="select-product"
                                options={this.state.products.map(product => ({
                                    value: product, label: product.brand + " - " + product.item
                                }))} onChange={e => this.setState({ selectedProduct: e.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control"
                                value={this.state.quantity}
                                min={1}
                                required
                                onChange={e => this.setState({ quantity: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-dark px-5">Add</button>
                    </div>
                </form>

                <div id="divToPrint">
                    <h3 className="text-center mt-5 mb-3"> Products to Purchase </h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Brand</th>
                                <th>Item</th>
                                <th className="text-end pr-4">Price</th>
                                <th className="text-end pr-4">Quantity</th>
                                <th className="text-end pr-4">Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.productList()}
                            <tr>
                                <td colSpan={4} className="text-end h5"> Total :</td>
                                <td className="text-end mr-5 h5">{this.state.netTotal}</td>
                            </tr>

                            <tr>
                                <td colSpan={4} className="text-end h5"> Customer payment :</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control text-end h5 mx-0 w-100"
                                        value={this.state.cusPayment}
                                        onChange={e => this.setState({
                                            cusPayment: e.target.value,
                                            change: e.target.value - this.state.netTotal
                                        })} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="text-end h5"> Change :</td>
                                <td className="text-end mr-5 h5">{this.state.change}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-end">

                        &nbsp;
                        <button onClick={this.clearBill} disabled={this.state.payoutItem.length === 0}
                            className="btn btn-outline-dark px-4 ">Clear Bill
                        </button>
                        &nbsp;
                        <button onClick={this.createBill} disabled={this.state.payoutItem.length === 0}
                            className="btn btn-dark px-4">Create Bill
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
