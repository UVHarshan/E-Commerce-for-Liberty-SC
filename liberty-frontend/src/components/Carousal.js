import React, {Component} from 'react';
import img1 from '../assets/images/Carousal/img1.jpg';
import img2 from '../assets/images/Carousal/img2.jpg';
import img3 from '../assets/images/Carousal/img3.jpg';
import img4 from '../assets/images/Carousal/img4.jpg';
import img5 from '../assets/images/Carousal/img5.jpg';


export default class Carousal extends Component {
    constructor() {
        super();
        this.state = {
            images: [img1, img2, img3, img4]
        }
    }

    render() {
        return (
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active"><img src={img5} className="img-fluid w-100" alt="..."/></div>
                    {
                        this.state.images.map((image, index) =>
                            <div className="carousel-item" key={index}>
                                <img src={image} className="img-fluid w-100" alt="..."/>
                            </div>
                        )
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Previous</span>
                </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
  }
}
