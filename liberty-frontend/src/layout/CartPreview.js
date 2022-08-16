import CartedItemPreview from "./CartedItemPreview";
import {Link} from "react-router-dom";
import {Component} from "react";

export default class CartPreview extends Component {
    constructor() {
        super();
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
        this.state = {
            cartedItems: [],
            tot: 0,
            isPlaceOrdering: false,
            isClicked: false,
            dCharge: 0
        }
    }

    componentDidMount() {
        let cartedItems = JSON.parse(localStorage.getItem("liberty-store-cart"));
        if(cartedItems===null){
            return;
        }
        this.setState({
            cartedItems: cartedItems,
        })
    }

    clearCart = () => {
        localStorage.setItem("liberty-store-cart", JSON.stringify([]));
        window.location.reload();
    }

    rerenderParentCallback() {
        this.componentDidMount();
    }

    render() {
        return (
            <>
            <span className="cart-container">
                &nbsp;&nbsp;<i className="feather-shopping-cart text-light pr-5" data-bs-toggle="modal"
                               onClick={this.rerenderParentCallback} data-bs-target="#exampleModal"/>
               <p className="circle-div" data-bs-toggle="modal" onClick={this.rerenderParentCallback}
                  data-bs-target="#exampleModal">{this.state.cartedItems.length}</p>
            </span>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="exampleModalLabel">Your Cart</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <table className="table table-responsive table-data">
                                    <thead>
                                    <tr>
                                        <th className="text-center" colSpan={2}>Item</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-center">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.cartedItems.map((product, index) =>
                                            <CartedItemPreview key={index} index={index} cartedItem={product}/>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" disabled={this.state.cartedItems.length === 0}
                                        onClick={this.clearCart}>Clear the cart
                                </button>
                                <Link to="/checkout" className="link-z-index">
                                    <button className="btn btn-primary px-4">Checkout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
