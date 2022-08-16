import {Component} from "react";

export default class CartedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: this.props.cartedItem.cQty,
            quantity: 1
        }
    }

    /**
     * Remove the product 
     */
    onHandelRemove = () => {
        let cartedProducts = JSON.parse(localStorage.getItem("liberty-store-cart"));
        let temArray =cartedProducts.filter(cartedItem => cartedItem.product._id !== this.props.cartedItem.product._id);
        localStorage.setItem("liberty-store-cart", JSON.stringify(temArray));
        this.props.rerenderParentCallback();
     
    }

    /**
     * Increase the carted quantity 
     */
    increaseQty = () => {
        if (this.state.qty < this.props.cartedItem.product.quantity) {
            this.changeCartedCountOfProduct(this.state.qty + 1);
            this.setState({qty: this.state.qty + 1});
        }
    }

    /**
     * Decrease the carted quantity 
     */
    decreaseQty = () => {
        if (this.state.qty > 1) {
            this.changeCartedCountOfProduct(this.state.qty - 1);
            this.setState({qty: this.state.qty - 1});
        }
    }

    /**
     * Change the carted quantity.
     * @param quantity
     */
    changeCartedCountOfProduct = (quantity) => {
        let cartedProducts = JSON.parse(localStorage.getItem("liberty-store-cart"));
        // let temArray =cartedProducts.map(cartedItem => cartedItem.product !== this.props.product ? cartedItem :
        //     {product: this.props.product, cQty:quantity});
        // let temArray =cartedProducts.filter(cartedItem => cartedItem.product._id !== this.props.cartedItem.product._id);

        let temArray =cartedProducts.map(cartedItem => cartedItem.product._id !== this.props.cartedItem.product._id ? cartedItem :
            {product: this.props.cartedItem.product, cQty:quantity});
        localStorage.setItem("liberty-store-cart", JSON.stringify(temArray));
        this.props.rerenderParentCallback();
    }

    render() {
        return (
            <tr className="checkout-page-item">
                <td className="pt-sm-4 pl-0 tbl-col-num">{this.props.index + 1}</td>
                <td className="tbl-col-img px-0 pt-0 pb-1 negation">
                    <img width={50} height={50} src={this.props.cartedItem.product.image} alt={"Icon"}
                         className="mx-auto mt-2"/>
                </td>
                <td className="pt-sm-4 pl-1 pl-sm-3 pl-md-5 text-left tbl-col-name">
                    {this.props.cartedItem.product.brand+ " - "+ this.props.cartedItem.product.item}</td>
                <td className="text-center px-0 pt-sm-4 tbl-col-qty">
                    <i className="feather-minus-circle operators mr-2" onClick={this.decreaseQty}/>
                    &nbsp;{this.state.qty}&nbsp;
                    <i className="feather-plus-circle operators ml-2 mr-4" onClick={this.increaseQty}/>
                </td>
                <td className="pt-sm-4 tbl-col-unit-price">
                    <p>Rs. {this.props.cartedItem.product.price}</p>
                </td>
                <td className="pt-sm-4 tbl-col-unit-amount px-0">
                    <p>Rs. {(this.props.cartedItem.product.price * this.state.qty).toFixed(2)}</p>
                </td>
                <td className="pt-sm-4 text-right tbl-col-unit-close pt-2">
                    <i className="feather-trash-2 text-danger" onClick={this.onHandelRemove}/>
                </td>
            </tr>
        )
    }
}
