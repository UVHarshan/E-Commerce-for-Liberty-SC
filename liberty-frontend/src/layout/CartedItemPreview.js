import {Component} from "react";

export default class CartedItemPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: this.props.cartedItem.cQty,
            quantity: 1
        }
    }

    render() {
        return (
            <tr className="checkout-page-item">
                <td className="tbl-col-img pt-0 pb-1 negation text-center">
                    <img width={40} height={40} src={this.props.cartedItem.product.image} className="mx-auto mt-2"/>
                </td>
                <td className="pt-sm-4 pl-1 pl-sm-3 pl-md-5 text-left tbl-col-name">
                    {this.props.cartedItem.product.title}</td>
                <td className="text-center px-0 pt-sm-4 tbl-col-qty">
                    {this.state.qty}
                </td>
                <td className="pt-sm-4 tbl-col-unit-amount pl-0 pr-3 text-end">
                    <p>Rs. {(this.props.cartedItem.product.price * this.state.qty).toFixed(2)}</p>
                </td>
            </tr>
        )
    }
}
