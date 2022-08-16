import image from "../../assets/images/warning.gif"
import {Component} from "react";

export default class WarningPage extends Component{
    render() {
        return (
            <div className="card dashboard-card">
                <img src={image} alt="warn" width={160} height={160} className="mx-auto my-5"/>
                <h3 className="text-center mb-5 pb-5">Sorry. You have no authority to access this page.</h3>
            </div>
        )
    }
}
