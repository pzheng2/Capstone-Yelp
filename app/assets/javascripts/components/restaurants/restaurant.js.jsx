var Restaurant = window.Restaurant = React.createClass ({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    this.restaurantId = parseInt(this.props.params.id);
    ApiUtil.fetchSingleRestaurant(this.restaurantId, this._receivedRestaurant);
    var loadingRestaurant = {
      name: "loading",
      address: "loading",
      phone: "loading",
      rating: "loading",
      categories: [],
      reviews: []
    };

    return { restaurant: loadingRestaurant };
  },

  componentDidMount: function () {
    RestaurantStore.addChangeListener(this._restaurantChanged);
  },

  componentWillUnmount: function () {
    RestaurantStore.removeChangeListener(this._restaurantChanged);
  },

  _receivedRestaurant: function (restaurant) {
    this.setState({ restaurant: restaurant });
  },

  _findRestaurantById: function () {
    var foundRestaurant;
    RestaurantStore.all().forEach(function (restaurant) {
      if (this.restaurantId === restaurant.id) {
        foundRestaurant = restaurant;
      }
    }.bind(this));
    return foundRestaurant;
  },

  _restaurantChanged: function () {
    var restaurant = this._findRestaurantById();
    this.setState({ restaurant: restaurant });
  },

  render: function () {
    var tags = [];
    var Link = ReactRouter.Link;
    var reviewURL = "/restuarants/" + this.restaurantId + "/review";

    if (this.state.restuarant) {
      this.state.restuarant.categories.forEach(function (tag) {
        tags.push(tag.category);

      }.bind(this));
    }

    return (
      <div className="restaurant-show-body body">
        <Link to="/">Back to Restaurants Index</Link>
        <img className="restaurant-image" src={ this.state.restaurant.image_url } />
        <h4 className="restaurant-name">{ this.state.restaurant.name }
          <div className={ "restaurant-rating rating-" + this.state.restaurant.rating }>
          </div>
        </h4>

        <ul className="restaurant-info group">

          <li className="restaurant-address">
            { "Address: " + this.state.restaurant.address }
          </li>

          <li className="restaurant-phone">
            { "Phone #: " + this.state.restaurant.phone }
          </li>

          <li className="restaurant-categories">
            { "Categories: " + this.state.restaurant.categories.join(", ") }
          </li>

          <br/>
        </ul>
        <div className="review-section">
          <ul className="reviews group">
            {
              this.state.restaurant.reviews.map(function (review) {
                return (
                  <li key={review.id}><Review review={ review } /></li>
                );
              })
            }
          </ul>
        </div>

        { this.props.children }
        <ul className="restaurant-info group">
          <Link className="write-review" to={"/restaurants/" + this.restaurantId + "/review/new"}>Write a Review</Link>
        </ul>
      </div>
    );
  }
});
          // <Link className="tag-restaurant" to={"/restaurants/" + this.restaurantId + "/restaurant_tag/new"}>Tag this Restaurant</Link>
