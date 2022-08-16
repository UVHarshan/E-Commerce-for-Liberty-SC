import {Component} from "react";
import ProductCard from "./ProductCard";
import {Link} from "react-router-dom";

export default class ProductListInOneLine extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts = () => {
        return (
            this.props.products.map((product, index) => this.props.category === product.category &&
                <ProductCard key={index} product={product}/>)
        );
    }

    render() {
        return (
            <div className="py-5 overflow-hidden">
                <div className="float-end w-100 text-end">
                    <Link to={"/category/" + this.props.category.toLowerCase()}
                          className="float-end text-decoration-underline"> View More <i
                        className="feather-chevrons-right"/></Link>
                </div>

                <h2 className="text-center w-100">{this.props.category}</h2>
                    <div className="d-inline-flex overflow-hidden">

                    {
                    this.renderProducts()
                }
                </div>
            </div>
        );
    }
}
