import React, { Component } from "react";
import { Link } from "react-router-dom";
import MaterialTable from 'material-table';
import { API } from "../../services/RESTService";

export default class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);
        this.sortList = this.sortList.bind(this);
        this.state = {
            products: [],
            values: [],
            brands: [],
        };
    }

    // Retrieving products from the database
    async componentDidMount() {
        API.GET("products").then((response) => {
            this.setState({ products: response });
        })
            .catch((error) => {
                console.log(error);
            });
        let brandsArray = [];
        this.state.products.forEach((item) => {
            brandsArray.push(item.brand);
        });
        const uniqueBrandArray = Array.from(new Set(brandsArray));
        this.setState({ brands: uniqueBrandArray, });
    }

    async deleteProduct(id) {
        await API.DELETE("products/" + id);

        // Setting the state by assigning elements unless the deleted element
        this.setState({ products: this.state.products.filter((el) => el._id !== id) });
    }

    sortList(cat) {
        const filteredProducts = this.state.products.filter((product) => product.category === cat);
        this.setState({ values: filteredProducts });
    }

    sortBrands(brand) {
        const filteredProducts = this.state.products.filter((product) => product.brand === brand);
        this.setState({ values: filteredProducts });
    }

    render() {
        return (
            <div className="mx-auto" style={{ maxWidth: "900px" }}>
                <MaterialTable
                    title="Products in the Shop"
                    columns={[
                        { title: "Brand", field: "brand" },
                        { title: "Item", field: "item" },
                        { title: "Category", field: "category" },
                        { title: "Price", field: "price" },
                        { title: "Quantity", field: "quantity" },
                        { title: "Action", field: "action" }
                    ]}
                    data={
                        this.state.products.map((product, index) => (
                            {
                                brand: product.brand,
                                item: product.item,
                                category: product.category,
                                price: "Rs " + product.price + ".00",
                                quantity: product.quantity,
                                action: (
                                    <div>
                                        <button className="w-100 btn btn-danger py-1 mb-1"
                                            onClick={() => this.deleteProduct(product._id)}> Delete
                                        </button>
                                        {" "}
                                        <Link to={"/shop/edit-product/" + product._id}>
                                            <button className="w-100 btn btn-warning py-1"> Update</button>
                                        </Link>
                                    </div>
                                )
                            }
                        ))
                    }
                    options={{
                        sorting: true,
                    }}
                />
            </div>
        );
    }
}
