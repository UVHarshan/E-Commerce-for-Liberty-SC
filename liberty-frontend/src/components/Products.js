import {Component} from "react";
import ProductCard from "./ProductCard";

export default class Products extends Component {
    constructor(props) {
        super(props);
    }

    renderProducts = () => {
        let productList = this.props.products.filter(product => this.props.category === product.category);
        if (this.props.isLimited) {
            return (productList.splice(0, 4).map((product, index) => <ProductCard key={index} product={product}/>));
        } else {
            return (productList.map((product, index) => <ProductCard key={index} product={product}/>));
        }

    }

    render() {
        return (
            <div className="d-flex flex-row flex-wrap justify-content-center py-5" >
                <h2 className="text-center w-100 mt-3">{this.props.category}</h2>
                {
                    this.renderProducts()
                }
            </div>
        );
    }
}
