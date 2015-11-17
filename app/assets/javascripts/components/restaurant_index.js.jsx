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
    debugger
    this.history.pushState(null,
      "/restaurants/" + event.currentTarget.id + "/show",
      null);
  },

  render: function () {
    return (
      <ol>
        {
          this.state.restaurants.map(function (restaurant) {
            return (
              <li onClick={this._onClick} id={restaurant.id} key={restaurant.id}>
                {restaurant.name}
              </li>
            );
          }.bind(this))
        }
      </ol>
    );
  }

});
