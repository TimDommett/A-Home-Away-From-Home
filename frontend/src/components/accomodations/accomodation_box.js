
import React from 'react';
import "./accomodation.css"
import StarRatingComponent from "react-star-rating-component";
import ShopShow from "./shop_show";
import ReviewCompose from "../reviews/review_compose_container";
import Reviews from "../reviews/reviews_container";


class AccomodationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: false };
    this.toggleDetail = this.toggleDetail.bind(this);




  }

  toggleDetail(e) {
    e.preventDefault();
    this.setState({
      description: !this.state.description,
    });
  }
    render() {

      let description;
      if (this.state.description) {
        description = (
          <div className="whole-page fade-in">
            <button
              onClick={this.toggleDetail}
              className="close-detail"
            >
              Close
            </button>
            <ShopShow
              key={this.props._id}
              title={this.props.title}
              text={this.props.text}
              link={this.props.link}
              price={this.props.price}
              photoURL={this.props.photoURL}
              lat={this.props.lat}
            />
            <ReviewCompose
              key={this.props.acc}
              accomodation={this.props.acc}
            />
            <Reviews
              key={this.props.acc}
              accomodation={this.props.acc}
            />
          </div>
        );
      };
        return (
          <div >
            <div onClick={this.toggleDetail} className="column fade-in grow">
              <img
                className="shop-photo"
                width="100px"
                src={this.props.photoURL}
                alt="missing"
              />
              <StarRatingComponent
                name="rate2"
                editing={false}
                renderStarIcon={() => <span>$</span>}
                starCount={5}
                value={this.props.price}
                className={"shop-price"}
              />
              <h3 className="shop-title">{this.props.title}</h3>

              <ul>{this.props.text}</ul>
            </div>

            {description}
          </div>
        );
    }
}

export default AccomodationBox;