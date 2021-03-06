var RestaurantIndex = window.RestaurantIndex = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return { restaurants: RestaurantStore.all() };
  },

  componentDidMount: function () {
    ApiUtil.fetchRestaurants();
    RestaurantStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    RestaurantStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ restaurants: RestaurantStore.all() });
  },

  _onClick: function (event) {
    this.history.pushState(null,
      "/restaurants/" + event.currentTarget.id,
      null);
  },

  render: function () {

    var Link = ReactRouter.Link;
    return (
      <ul className="restaurant-index-items group">
        {
          this.state.restaurants.map(function (restaurant) {
            return (
              <RestaurantIndexItem key={ restaurant.id } restaurant={ restaurant } />
            );
          }.bind(this))
        }

        <Link className="create-restaurant" to="/restaurants/new" >Create New Restaurant</Link>
      </ul>
    );
  }

});
              // <li onClick={ this._onClick } className="restaurant-index-item" id={ restaurant.id } key={ restaurant.id }>
              //   <img className="restaurant-index-items-image" src={restaurant.image_url} />
              //   <label onHover={ this._onHover }>
              //
              //     <div className="restaurant-index-items-body">
              //       <label className="restaurant-index-items-name">
              //         { restaurant.name }
              //       </label>
              //
              //       <label className="restaurant-index-items-address">
              //         { restaurant.address }
              //       </label>
              //
              //       <label className="restaurant-index-items-phone">
              //         { restaurant.phone }
              //       </label>
              //
              //       <label className="restaurant-index-items-categories">
              //         { restaurant.categories.join(", ") }
              //       </label>
              //
              //     </div>
              //
              //   </label>
              // </li>
