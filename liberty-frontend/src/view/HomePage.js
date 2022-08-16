import React, {Component} from 'react';
import Carousal from "../components/Carousal";
import {API} from "../services/RESTService";
import Products from "../components/Products";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            url: window.location.href
        }
    }

    async componentDidMount() {
        const products = await API.GET('products', null);
        const categories = [...new Set(products.map(item => item.category))];

      

        this.setState({products: products, categories: categories});

        // console.log(this.state.products)
        
        // console.log(this.state.categories)
    }

    renderCategories() {
        return this.state.categories.map((category, index) =>
                <Products key={index} products={this.state.products} category={category} isLimited={true}/>
        )
    }

    render() {
        return (
            <section>
                <Carousal/>
                <div className="container" id="search" >
                    {
                        this.renderCategories()
                    }
                </div>
            </section>


        );
  }
}
