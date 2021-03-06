var Home = window.Home = React.createClass({

  getInitialState: function () {
    return {
      restaurants: RestaurantStore.all(),
      tabs: TabStore.all()
    };
  },

  _restaurantsChanged: function () {
    this.setState({ restaurants: RestaurantStore.all() });
  },

  _tabsChanged: function () {
    var tabs = { bar: [], american: [], italian: [], asian: [], spanish: [], mexican: [] };
    var restaurants = TabStore.all();
    Object.keys(tabs).forEach(function (category, i) {
      tabs[category] = restaurants[i];
    });
    this.setState({ tabs: tabs });
  },

  componentDidMount: function () {
    // TabApiUtil.fetchTabs();
    RestaurantStore.addChangeListener(this._restaurantsChanged);
    TabStore.addChangeListener(this._tabsChanged);
  },

  componentWillUnmount: function () {
    RestaurantStore.removeChangeListener(this._restaurantsChanged);
    TabStore.removeChangeListener(this._tabsChanged);
  },

  handleMarkerClick: function (marker) {
    this.props.history.pushState(null, "restaurants/" + marker.id);
  },

  getBounds: function (bounds) {
    this.bounds = bounds;
    TabApiUtil.fetchTabs(bounds);
  },

  render: function () {
    var tabsList = [];
    var tabsComponent = null;

    this.state.tabs.bar && Object.keys(this.state.tabs).forEach(function (category) {
      tabsList.push({ name: category, content: this.state.tabs[category] });
    }.bind(this));

    if (tabsList.length) {
      tabsComponent = <Tab tabs={ tabsList } />;
    }

    return (
      <div className="home-body mobile-container group">
        <Map
          getBounds={ this.getBounds }
          handleMarkerClick={ this.handleMarkerClick }
          restaurants={ this.state.restaurants }
        />
        { tabsComponent }

      </div>
    );
  }

});
        // <RestaurantIndex />
        // <div className="tab-names-div group">
        // </div>
