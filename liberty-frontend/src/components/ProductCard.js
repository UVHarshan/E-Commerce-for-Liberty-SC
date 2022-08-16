import { Component } from "react";
//import "aos/dist/aos.css";
import Swal from 'sweetalert2';
import { Redirect } from "react-router-dom";



export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCarted: false,
            qty: 1,
            redirect: '',
            userData: JSON.parse(localStorage.getItem("liberty-store-userData"))
        }
    }

    componentDidMount() {
        let cartedProducts = JSON.parse(localStorage.getItem("liberty-store-cart"));
        if (cartedProducts !== null) {
            cartedProducts.map(item => {
                if (item.product._id === this.props.product._id) {
                    this.setState({ isCarted: true, qty: item.cQty });
                }
            })
        }
    }

    onHandelUpdate = (event) => {
        event.preventDefault();
        event.stopPropagation();
    
    }

    /**
     * Add product into
     * @param event
     */
    onHandelAddToCart = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.userData === null) {
            Swal.fire({
                title: 'Before adding products to cart, you need to login',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `New user`,
                denyButtonText: `login`,
            }).then((result) => {
                
                if (result.isConfirmed) {
                    this.setState({ redirect: "signup" });
                } else if (result.isDenied) {
                    this.setState({ redirect: "login" });
                }
            })
            return
        } else if (this.state.userData.userType === "admin" || this.state.userData.userType === "cashier") {
            Swal.fire('Sorry. Customers only can add products to cart.');
            return;
        }

        this.setState({ isCarted: true });
        let cartedProducts = JSON.parse(localStorage.getItem("liberty-store-cart"));
        if (cartedProducts === null) {
            localStorage.setItem("liberty-store-cart", JSON.stringify(
                [{ product: this.props.product, cQty: this.state.qty }]));
        } else {
            cartedProducts.push({ product: this.props.product, cQty: this.state.qty });
            localStorage.setItem("liberty-store-cart", JSON.stringify(cartedProducts));
        }
    }


    /**
     * Increase the carted quantity
     */
    increaseQty = () => {
        if (this.state.qty < this.props.product.quantity) {
            this.changeCartedCountOfProduct(this.state.qty + 1);
            this.setState({ qty: this.state.qty + 1 });
        } else {
            alert("You have reached to the stock count")
        }
    }

    /**
     * Decrease the carted quantity
     */
    decreaseQty = () => {
        if (this.state.qty > 1) {
            this.changeCartedCountOfProduct(this.state.qty - 1);
            this.setState({ qty: this.state.qty - 1 });
        }
    }

    /**
     * Change the carted quantity
     */
    changeCartedCountOfProduct = (num) => {
        if (!this.state.isCarted) {
            return;
        }
        let cartedProducts = JSON.parse(localStorage.getItem("liberty-store-cart"));
        let temArray = cartedProducts.map(cartedItem => cartedItem.product._id !== this.props.product._id ? cartedItem :
            { product: this.props.product, cQty: num });
        localStorage.setItem("liberty-store-cart", JSON.stringify(temArray));
    }

    render() {
        if (this.state.redirect === "login") {
            return <Redirect to='/login' />
        }
        if (this.state.redirect === "signup") {
            return <Redirect to='/signup' />
        }
        if (this.state.redirect === "productPreview") {
            return <Redirect to={'/product/' + this.props.product._id} />
        }


        return (
            <div className="product-card card m-1">
                <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ redirect: "productPreview" })}>
                    <div className="product-image mt-2">
                        <img className="img-fluid" src={this.props.product.image} alt={".."} /></div>
                    <h3 className="h5 text-center pt-1">{this.props.product.brand + " " + this.props.product.item}</h3>
                    <p className="text-center">Rs. {this.props.product.price}.00</p>
                </div>
                <form onSubmit={this.onHandelAddToCart} >
                    <div className="m-0 px-2 pb-4">
                        <span className="h4 mt-1 d-inline-block">
                            <i className="feather-minus-circle operators mr-2" onClick={this.decreaseQty} />
                            &nbsp;{this.state.qty}&nbsp;
                            <i className="feather-plus-circle operators ml-2 mr-4" onClick={this.increaseQty} />
                        </span>
                        {
                            this.state.isCarted ?
                                <button onClick={this.onHandelUpdate}
                                    className='float-end px-4 btn btn-outline-primary update-card'>Update</button> :
                                <button type="submit" className='float-end btn btn-primary add-to-card'>Add To
                                    Cart</button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}
