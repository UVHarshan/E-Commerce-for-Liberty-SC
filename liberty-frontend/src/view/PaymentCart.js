import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {API} from "../services/RESTService";
import Swal from "sweetalert2";
import CreditCardInput from 'react-credit-card-input';


export default class PaymentCart extends Component {
    constructor() {
        super();
        this.state = {
            customerId: "",
            customerName: "",
            deliveryAddress: "",
            mobile: "",
            total: 0,
            items: [],
            paymentMethod: "",
            status: "pending",
            cardNumber: "",
            expiry: "",
            cvc: ""
        }
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
        this.handleCardCVCChange = this.handleCardCVCChange.bind(this);

    }

    async createBill() {
        console.log("Create bill")
        const order = {
            customerId: this.state.customerId,
            customerName: this.state.customerName,
            deliveryAddress: this.state.deliveryAddress,
            mobile: this.state.mobile,
            total: this.state.total,
            items: this.state.items,
            orderDate: new Date(),
            issueDate: "null",
            paymentMethod: this.state.paymentMethod,
            status: this.state.status
        };
        await API.POST("sales/add", order);
        this.setState({payoutItem: []});
        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Add Bill successful',
            showConfirmButton: false,
            timer: 1700
        })
        localStorage.setItem("liberty-store-cart", JSON.stringify([]));
        window.location.href="/"

    }

    async componentDidMount() {
        const customer = await API.GET("customers/" + JSON.parse(localStorage.getItem("liberty-store-userData")).userId);

        this.setState({
            customerId: customer._id,
            customerName: customer.userName,
            deliveryAddress: customer.deliveryAddress,
            mobile: customer.mobile,
            total: JSON.parse(localStorage.getItem("liberty-store-cart")).reduce((sum, cItem) =>
                sum + cItem.cQty * cItem.product.price, 0),
            items: JSON.parse(localStorage.getItem("liberty-store-cart")).map(cartedItem => ({
                brand: cartedItem.product.brand,
                item: cartedItem.product.item,
                price: cartedItem.product.price,
                quantity: cartedItem.cQty
            }))
        })
    }

    handleCardNumberChange(e) {
        this.setState({cardNumber: e.target.value})
    }

    handleCardExpiryChange(e) {
        this.setState({expiry: e.target.value})
    }

    handleCardCVCChange(e) {
        this.setState({cvc: e.target.value})

    }

    render() {
        if (JSON.parse(localStorage.getItem("liberty-store-userData"))=== null ||
            JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "customer") {
            return (
                <Redirect to="/login"/>
            )
        }

        return (
            <div className="py-5 container">
                <div className="card dashboard-card">
                    <h1 className="text-center mx-auto mb-3">Payment</h1>

                    <div className="accordion" id="accordionExample1">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingAddress">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseAddress" aria-expanded="true"
                                        aria-controls="collapseAddress">
                                    <i className="feather-navigation"/>&nbsp;&nbsp;Address
                                </button>
                            </h2>
                            <div id="collapseAddress" className="accordion-collapse collapse show"
                                 aria-labelledby="headingAddress"
                                 data-bs-parent="#accordionExample1">
                                <div className="accordion-body p-0">
                                    <input type="text" className="form-control m-0 p-3" id="exampleInputBrand"
                                           value={this.state.deliveryAddress}
                                           onChange={e => this.setState({deliveryAddress: e.target.value})}
                                           aria-describedby="brandHelp"/>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingCall">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseCall" aria-expanded="true"
                                        aria-controls="collapseCall">
                                    <i className="feather-phone"/>&nbsp;&nbsp;Contact Number
                                </button>
                            </h2>
                            <div id="collapseCall" className="accordion-collapse collapse show"
                                 aria-labelledby="headingCall"
                                 data-bs-parent="#accordionExample1">
                                <div className="accordion-body p-0">
                                    <input type="text" className="form-control m-0 p-3" id="exampleInputBrand"
                                           value={this.state.mobile}
                                           onChange={e => this.setState({mobile: e.target.value})}
                                           aria-describedby="brandHelp"/>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingPay">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapsePay" aria-expanded="true"
                                        aria-controls="collapseCall">
                                    <i className="feather-dollar-sign"/>&nbsp;&nbsp;Payment Method
                                </button>
                            </h2>
                            <div id="collapsePay" className="accordion-collapse collapse show"
                                 aria-labelledby="headingPay"
                                 data-bs-parent="#accordionExample1">
                                <div className="accordion-body p-0">
                                    <input className="m-3" type="radio" id="cashOnDelivery" name="payment"
                                           checked={this.state.paymentMethod === "cashOnDelivery"}
                                           onClick={() => this.setState({paymentMethod: "cashOnDelivery"})}
                                           value="cashOnDelivery"/>
                                    <label htmlFor="cashOnDelivery">Cash on Delivery</label><br/>
                                    <input className="mt-2 mb-4 mx-3" type="radio" id="cardPayment" name="payment"
                                           checked={this.state.paymentMethod === "cardPayment"}
                                           onClick={() => this.setState({paymentMethod: "cardPayment"})}
                                           value="cardPayment"/>
                                    <label htmlFor="cardPayment">Card Payment</label><br/>
                                </div>
                                {
                                    this.state.paymentMethod === "cardPayment" &&
                                    <>
                                        <CreditCardInput
                                            cardNumberInputProps={{
                                                value: this.state.cardNumber,
                                                onChange: this.handleCardNumberChange
                                            }}
                                            cardExpiryInputProps={{
                                                value: this.state.expiry,
                                                onChange: this.handleCardExpiryChange
                                            }}
                                            cardCVCInputProps={{
                                                value: this.state.cvc,
                                                onChange: this.handleCardCVCChange
                                            }}
                                            fieldClassName="input"
                                        />
                                        <br/><br/> </>
                                }
                            </div>
                        </div>

                        <button className="w-100 py-3 btn btn-primary" disabled={
                            this.state.paymentMethod !== "cashOnDelivery" &&
                            (this.state.cardNumber === "" || this.state.expiry === "" || this.state.cvc === "")
                        }
                                onClick={() => this.createBill()}>Pay the Bill
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}
