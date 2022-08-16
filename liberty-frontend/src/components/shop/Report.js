import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import {API} from "../../services/RESTService";

export default class Report extends Component {
    chartInstance = null;

    constructor(props) {
        super(props);
        this.state = {
            backgroundColors: ["#0d47a1", "#002171", "#5472d3", "#1565c0", "#003c8f", "#5e92f3", "#1e88e5"],
            products: [],
            counts: [10, 12, 2],
            dataBarStock: {
                labels: ["a", "b"],
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59],
                    backgroundColor: this.backgroundColors,
                }]
            }
        }
    }

    async componentDidMount() {
        const products = await API.GET('products', null);
        const pNames = [...products.map(item => item.brand + " " + item.item)];     

        const dataBarStock = {
            labels: pNames,
            datasets: [{data: [...products.map(item => item.quantity)], backgroundColor: this.state.backgroundColors,}]
        }     

        this.setState({dataBarStock: dataBarStock});
    }


    render() {
        return (
            <div>
                <div className="card text-center px-3 py-5 mx-auto my-3">
                    <h2 className="mb-3">Product Stock</h2>
                    <Bar
                        data={this.state.dataBarStock}
                        ref={input => {
                            this.chartInstance = input
                        }}
                        type={"bar"}/>
                </div>                
            </div>
        );
    }

}
