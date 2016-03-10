import React, { Component } from 'react';
import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { id: 1, name: 'Milk' },
        { id: 2, name: 'Yogurt' },
        { id: 3, name: 'Orange Juice' }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.key === 'Enter') {
      let newItem = { id: Date.now(), name: event.target.value },
          newItems = this.state.items.concat(newItem);

      event.target.value = '';
      this.setState({ items: newItems });
    }
  }

  handleRemove(index) {
    let newItems = this.state.items;
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }

  render(){
    let { items, newItem } = this.state;
    let shoppingItems = items.map((item, index) => {
      let { id, name } = item,
          handleRemove = this.handleRemove.bind(this, index);
      return (
        <div key={id} className="item" onClick={handleRemove}>
          {name}
        </div>
      );
    });

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear
          transitionAppearTimeout={1000}
        >
          {shoppingItems}
        </ReactCSSTransitionGroup>
        <input type="text" onKeyDown={this.handleChange} />
      </div>
    );
  }
}

export default App;
