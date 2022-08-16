import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/Liberty.PNG';
import {API} from "../services/RESTService";

export default class Footer extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    async componentDidMount() {
        const products = await API.GET('products', "", null);
        this.setState({categories:[...new Set(products.map(item => item.category))]});

    }

    render() {
        return (
            <footer className="full-footer">
                <div className="d-flex flex-row flex-wrap justify-content-around">
                    <div className="footer-box-div">
                        <img className="img-fluid pt-2 pb-2" width={180} height={180} src={logo} alt=""/>
                    </div>

                    <div className="footer-box-div">
                        <h3> Categories </h3><br/>
                        {
                            this.state.categories.map((item, index) =>
                                <span key={index}><Link
                                    to={"/category/" + item.toLowerCase()}> {item} </Link><br/></span>)
                        }

                    </div>

                    <div className="footer-box-div">
                        <h3>Contact Us</h3><br/>
                        <a href="tel:0778075378"><i className="feather-phone-call"/> 0775287894</a><br/>
                        <a href="mailto:libertySC@gmail.com"><i
                            className="feather-mail"/> libertySC@gmail.com</a><br/>
                    </div>

                </div>
            </footer>
        );
    }
}
