import React, {Component} from "react";
import CartedItem from "../components/CartedItem";
import cartGif from "../assets/images/cart_gif.gif"
import {Redirect} from "react-router-dom";

export default class CheckoutPage extends Component {
    constructor() {
        super();
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
        this.state = {
            cartedItems: [],
            tot: 0,
            dCharge: 0,
            redirect: false
        }
    }

    componentDidMount() {
        let cartedItems = JSON.parse(localStorage.getItem("liberty-store-cart"));
        if(cartedItems===null){
            return;
        }

        this.setState({
            cartedItems: cartedItems,
            tot: cartedItems.reduce((sum, cItem) => sum + cItem.cQty * cItem.product.price, 0),
            dCharge: 50 * cartedItems.length
        })
    }

    rerenderParentCallback() {
        this.componentDidMount();
    }

    render() {
        if(this.state.redirect){
            return (
                <Redirect to="/payment"/>
            )
        }
        return (
            <div className="container py-5">
                <h1 className="text-left checkout-page-title h2 py-sm-2 pt-md-4 mx-lg-3">Checkout</h1>
                <div className="table-div p-2 p-md-3 ml-lg-3">
                    <table className="table table-responsive table-data">
                        <thead>
                        <tr>
                            <th className="index-col px-0">#</th>
                            <th className="text-center" colSpan={2}>Item</th>
                            <th className="text-center">Qty</th>
                            <th className="text-right">Unit Price</th>
                            <th className="text-center" colSpan={2}>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.cartedItems.map((cartedItem, index) =>
                                <CartedItem key={index} index={index} cartedItem={cartedItem}
                                            rerenderParentCallback={this.rerenderParentCallback}/>
                            )}

                        {
                            this.state.cartedItems.length === 0 &&
                                <div className="float-end">
                                    <img width="250" height="250" src={cartGif} alt="empty card" className="mx-auto my-4"/>
                                </div>
                        }
                        </tbody>
                    </table>

                    <div className="row calculation-area pr-2 pr-sm-5">
                        <div className="col-6 text-left">Delivery Charge</div>
                        <div className="col-6"><p>Rs. {this.state.dCharge.toFixed(2)}</p></div>
                    </div>
                    <hr/>
                    <div className="row calculation-area pr-2 pr-sm-5">
                        <div className="col-6 text-left">Total</div>
                        <div className="col-6 total">
                            <p>Rs. {(this.state.tot + this.state.dCharge).toFixed(2)}</p>
                        </div>
                    </div>
                    {
                        (this.state.cartedItems.length > 0) &&
                        <div className="text-end m-0 mt-3">
                            <button className="btn btn-primary custom-primary-button"
                                    onClick={() => this.setState({redirect: true})}>Place Order now &nbsp;
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
