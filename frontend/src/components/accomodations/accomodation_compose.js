
import React from 'react';
// import AccomodationBox from "./accomodation_box";
// import S3FileUpload from "react-s3";
import S3 from "aws-s3";
import Maps from "../maps/maps"
import StarRatingComponent from "react-star-rating-component";



const keys = require("../../keys");

const config = {
  bucketName: "ahomeawayfromhome",
  dirName: "photos",
  region: "eu-west-2",
  accessKeyId: keys.awsAccessKeyID,
  secretAccessKey: keys.awsSecretAccessKey
};

const S3Client = new S3(config);

// const newFileName = 'my-awesome-file';



class AccomodationCompose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      link: "",
      price: 1,
      photoURL: "", 
      // set the default here in photoURL
      newAccomodation: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.upload = this.upload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ newAccomodation: nextProps.newAccomodation.text });
  }

  upload(e) {

    // const fileReader = new FileReader();
    // e.preventDefault;
    console.log(e.target.files[0]);
    S3Client.uploadFile(e.target.files[0])
      .then(data =>
        this.setState({
          photoURL: data.location
        })
      )
      // .then(data => console.log(data.location))
      .catch(err => console.error(err));
  };
    // S3FileUpload.uploadFile(e.target.files[0], config)
    //   .then(data => console.log(data.location))
    //   .catch(err => alert(err))

  handleSubmit(e) {
    e.preventDefault();
    let accomodation = {
      title: this.state.title,
      text: this.state.text,
      link: this.state.link,
      price: this.state.price,
      photoURL: this.state.photoURL,
      lat: this.state.location.lat,
      lng: this.state.location.lng,
      newAccomodation: ""
    };

    this.props.composeAccomodation(accomodation);
    this.setState({
      text: "",
      title: "",
      link: "",
      price: 1,
      photoURL: ""
    });
  }


  onStarClick(nextValue, prevValue, name) {
    this.setState({ price: nextValue });
  }

  update(property) {
    return e =>
      this.setState({
        [property]: e.target.value
      });
  }

  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
      event.stopPropagation();
      
      // this.value = this.value + "\n";
    }
  }

  render() {
    const { title, text, link, price } = this.state;
    const preview = this.state.photoURL ? <img className="image-preview new-post-form-child" width="100px" alt="" src={this.state.photoURL} /> : null;


    return (
      <div>
        <form onSubmit={this.handleSubmit} onKeyPress={this.onKeyPress} className="shop-form">
          <div>
            <input
              type="text"
              value={title}
              onChange={this.update("title")}
              placeholder="Write your title here..."
            />

            <input
              type="textarea"
              value={text}
              onChange={this.update("text")}
              placeholder="Write your accomodation details here..."
            />

            <input
              type="textarea"
              value={link}
              onChange={this.update("link")}
              placeholder="Give a link to your website..."
            />

            {preview}
            <input
              type="file"
              // value={price}
              onChange={this.upload}
              // placeholder="Write your accomodation..."
            />
            <div>
              {/* <h2>Rating from state: {price}</h2> */}
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={price}
                renderStarIcon={() => <span>$</span>}

                onStarClick={this.onStarClick.bind(this)}
              />
            </div>
            {/* <select value={price} onChange={this.update("price")}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> */}
            <input type="submit" value="Submit" />
          </div>
        </form>
        <br />
        {/* <AccomodationBox text={this.state.newAccomodation} /> */}
        <Maps />
      </div>
    );
  }
}

export default AccomodationCompose;