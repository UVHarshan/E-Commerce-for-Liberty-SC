import React, { Component } from "react";
import Select from "react-select";
import { API } from "../../services/RESTService";
import Swal from "sweetalert2";

export default class SendOrder extends Component {
  constructor(props) {
    super(props);

    // Method Binding
    this.onSubmit = this.onSubmit.bind(this);
    this.productList = this.productList.bind(this);
    this.sendOrder = this.sendOrder.bind(this);

    this.state = {
      supplier: "",
      supplierList: [],
      brand: "",
      item: "",
      quantity: "",
      selectedProduct: "",
      payoutItems: [],
      products: []
    };
  }

  productList() {
    return this.state.payoutItems.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.product}</td>
          <td>{item.quantity}</td>
        </tr>
      )
    });
  }



  async sendOrder() {
    const order = {
      supplier: this.state.supplier,
      order: this.state.payoutItems
    }

    // await API.POST("suppOrder/add", "", order);

    await API.POST("mailSuppliers/send-mail/" + this.state.supplier.email + "/" + this.state.supplier.name, this.state.payoutItems);
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Add email successful',
      showConfirmButton: false,
      timer: 1800
    }).then(Array.from(document.querySelectorAll("input")).forEach(input => (input.value = "")))
  }


  onSubmit(e) {
    e.preventDefault();
    if (this.state.supplier === "") {
      Swal.fire('Please select the supplier');
      return
    }
    if (this.state.selectedProduct === "") {
      Swal.fire('Please select the product');
      return
    }

    if (this.state.quantity === "") {
      Swal.fire('Please add amount of request');
      return
    }

    let arr = this.state.payoutItems
    arr.push({
      product: this.state.selectedProduct.brand + " " + this.state.selectedProduct.item,
      quantity: this.state.quantity
    })

    this.setState({
      brand: "",
      item: "",
      quantity: "",
      payoutItems: arr
    })
  }

  async componentDidMount() {
    const supplierList = await API.GET("suppliers");
    const products = await API.GET('products', "", null);
    this.setState({ products: products, supplierList: supplierList });
  }

  render() {
    return (
      <div className="card dashboard-card">
        <div className="card-body">
          <h3 className="text-center"> Send Order </h3>
          <form onSubmit={this.onSubmit}>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">
                Supplier
              </label>
              <div className="col-sm-10">
                <Select id="select-product"
                  options={this.state.supplierList.map(supplier => ({
                    value: supplier, label: supplier.name
                  }))} onChange={e => this.setState({ supplier: e.value })}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Product
              </label>
              <div className="col-sm-10">
                <Select id="select-product"
                  options={this.state.products.map(product => ({
                    value: product, label: product.brand + " - " + product.item
                  }))} onChange={e => this.setState({ selectedProduct: e.value })}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Quantity
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword"
                  value={this.state.quantity}
                  onChange={e => {
                    this.setState({ quantity: e.target.value })
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark px-5 float-end">Add</button>
          </form>
        </div>

        <div>
          <h3 className="text-center">  Products to order</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{this.productList()}
            </tbody>
          </table>
          <button onClick={this.sendOrder} disabled={this.state.payoutItems.length === 0} className="btn btn-dark px-4 float-end">Create Order</button>
        </div>
      </div>
    );
  }
}
