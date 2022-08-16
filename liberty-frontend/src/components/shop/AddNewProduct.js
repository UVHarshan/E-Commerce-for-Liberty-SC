import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImgUpload from "../ImageUpload";
import Creatable from 'react-select/creatable';
import { API } from "../../services/RESTService";
import WarningPage from "./WarningPage";
import Swal from "sweetalert2";

export default class AddNewProduct extends Component {
  constructor(props) {
    super(props);

    // Method Binding
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeIsUploadingImage = this.onChangeIsUploadingImage.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);


    this.state = {
      brand: "",
      item: "",
      category: "",
      image: "",
      price: "",
      quantity: "",
      date: new Date(),
      categories: [],
      isUploadingImage: false
    };
  }

  async componentDidMount() {
    API.GET("prodCategories").then(responseData =>
      this.setState({ categories: responseData.map(cat => cat.category) })
    )
  }

  onChangeIsUploadingImage(value) {
    this.setState({ isUploadingImage: value })
  }

  onChangeImage(img) {
    this.setState({ image: img });
  }

  onChangeCategory(e) {
    this.setState({ category: e.value })
  }

  async onSubmit(e) {
    e.preventDefault();

    if (this.state.category === "") {
      await Swal.fire('Please select the category');
      return;
    }

    if (this.state.image === "") {
      await Swal.fire('Please select the image');
      return;
    }

    const product = {
      brand: this.state.brand,
      item: this.state.item,
      category: this.state.category,
      image: this.state.image,
      price: this.state.price,
      quantity: this.state.quantity,
      expiryDate: this.state.date,
    };

    await API.POST("products/add", product);
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Add new product successful',
      showConfirmButton: false,
      timer: 1800
    }).then(Array.from(document.querySelectorAll("input")).forEach(input => (input.value = "")));

    this.setState({
      brand: "",
      item: "",
      category: "",
      image: "",
      price: "",
      quantity: "",
      date: ""
    });
  }

  render() {
    if (JSON.parse(localStorage.getItem("liberty-store-userData")) === null
      || JSON.parse(localStorage.getItem("liberty-store-userData")).userType !== "admin") {
      return (
        <WarningPage />
      )
    }
    return (
      <div className="card dashboard-card">
        <h1 className="text-center mb-3 h2">Add New Product</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <Creatable options={this.state.categories.map(category => ({ value: category, label: category }))}
              onChange={this.onChangeCategory} />
          </div>
          <ImgUpload onChangeImage={this.onChangeImage}
            onChangeIsUploadingImage={this.state.onChangeIsUploadingImage} />

          <div className="mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputBrand"
              value={this.state.brand}
              onChange={e => this.setState({ brand: e.target.value })}
              aria-describedby="brandHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Item</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputItem"
              value={this.state.item}
              onChange={e => this.setState({ item: e.target.value })}
              aria-describedby="brandHelp"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPrice"
              value={this.state.price}
              onChange={e => this.setState({ price: e.target.value })}
              aria-describedby="brandHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDescription" className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputDescription"
              value={this.state.quantity}
              onChange={e => this.setState({ quantity: e.target.value })}
              aria-describedby="brandHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-block"> Expiry Date </label>
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={e => this.setState({ date: e })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary px-5 float-end">Submit</button>
        </form>
      </div>
    );
  }
}
