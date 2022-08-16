import React, {Component} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import image from "../assets/images/loading.gif";
import placeHolderImg from "../assets/images/placeHolder.png";

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isLoading: false,
            cropper: undefined,
            src: ''
        }
        console.log(this.props)
    }

    onChange = (e) => {
        console.log(this.state);
        console.log(this.props);
        // this.setState({isVisible: true});
        this.setState({isVisible: true, isUploadingImage: true});


        // this.props.setIsImageUploading(true);
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({src: reader.result});
        };
        reader.readAsDataURL(files[0]);
    }

    convertDataUrlToBlob = (dataUrl) => {
        const arr = dataUrl.split(',');
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: "png"});
    }

    cropImage = async () => {
        if (typeof this.state.cropper !== "undefined") {
            this.setState({isVisible: false});
        }
        this.setState({isUploadingImage: true});

        const fileCropped = await new File([this.convertDataUrlToBlob(this.state.cropper.getCroppedCanvas().toDataURL())],
            "croppedImg.jpeg", {type: `image/jpeg`});
        const data = new FormData();
        data.append('file', fileCropped);
        data.append('upload_preset', '' + process.env.REACT_APP_IMAGE_UPLOAD_PRESET_VAL);
        data.append("cloud_name", '' + process.env.REACT_APP_IMAGE_CLOUD_NAME);

        
        const options = {
            method: 'POST',
            body: data,
        };

        // Image Uploading Process
        return fetch(process.env.REACT_APP_IMAGE_UPLOADING_API_URL + "image/upload", options)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.props.onChangeImage(res.secure_url);
                this.props.onChangeIsUploadingImage(false);
                this.setState({isUploadingImage: false, image: "MY image"})
            })
            .catch(err => console.log(err));
   

    }

    render() {
        return (
            <div>
                <label className="pt-3">Product Image</label><br/>
                {
                    this.state.isLoading &&
                    <div className="text-center pt-2"><img width={270} src={image} alt='....'/><p>Loading...</p></div>
                }
                {
                    !this.state.isLoading && !this.state.isVisible && this.props.imageUrl &&
                    <div className="text-center pt-2">
                        <img style={{width: '270px'}} className="image-preview py-2"
                             src={this.props.imageUrl ? this.props.imageUrl + "" : placeHolderImg}/></div>
                }

                <input className="pb-2" type="file" onChange={(e) => this.onChange(e)} accept="image/*"/>
                <br/>
                {
                    this.state.isVisible &&
                    <div>
                        <Cropper
                            className='negation'
                            aspectRatio={1}
                            preview=".img-preview"
                            guides={false}
                            src={this.state.src}
                            viewMode={1}
                            dragMode="move"
                            cropBoxMovable={false}
                            onInitialized={(instance) => {
                                this.setState({cropper: instance})
                            }}
                        />
                        {
                            this.state.isVisible &&
                            <React.Fragment>
                                <button className='btn btn-primary float-right mt-2' onClick={this.cropImage}>
                                    Crop Image
                                </button>

                                <br/>
                                <br/>
                            </React.Fragment>
                        }
                    </div>
                }
            </div>
        );
    }


}

