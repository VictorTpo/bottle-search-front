import React, { Component } from 'react';

class Counter extends Component {
  state = {
    value: this.props.value,
    tags: []
  };

  // constructor(){
  //   super();
  //   console.log('Constructor', this);
  // }

  formatCount(){
    const { value } = this.state
    return value === 0 ? 'zero' : value;
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>No tags!</p>
    return(
      <ul>
        { this.state.tags.map(tag => <li key={tag}>{ tag }</li>) }
      </ul>
    )
  }

  handleIncrement = product_id => {
    this.setState({ value: this.state.value + 1 });
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <h4>Counter #{ this.props.value }</h4>
        <div className='row'>
          <div className='col-2'>
            <span>{ this.formatCount() }</span>
          </div>
          <div className='col-2'>
            <button
              onClick={ () => this.handleIncrement({id: 1}) }
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
