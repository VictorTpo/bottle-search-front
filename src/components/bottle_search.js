import React, { Component } from 'react';

const SEARCH_URL = 'http://localhost:3000/bottles/search'

class BottleSearch extends Component {
  state = {
    error:      null,
    isLoaded:   false,
    bottles:    [],
    text:       '',
    color:      '',
    sparkling:  '',
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.callSearch()
  }

  callSearch = (event) => {
    // console.log('search', this.state)
    fetch(SEARCH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text:       this.state.text,
        color:      this.state.color,
        sparkling:  this.state.sparkling,
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            bottles: result.search.bottles
          });
        },
        (error) => {
          // console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    }, () => {  this.callSearch() })
  }

  render() {
    return(
      <div className = 'container'>
        <form className = 'col-md-10 offset-md-1'>
          <div className = 'form-group'>
            <input
              type        = 'text'
              placeholder = 'name, keywords...'
              className   = 'form-control'
              name        = 'text'
              value       = { this.state.text }
              onChange    = { this.handleChange }
            />
          </div>
          <div className = 'form-group row'>
            <div className='col-md-3'>
              <select
                name      = 'color'
                className = 'form-control'
                value     = { this.state.color }
                onChange  = { this.handleChange }
              >
                <option>--color--</option>
                <option value = 'red'>red</option>
                <option value = 'white'>white</option>
                <option value = 'pink'>pink</option>
              </select>
            </div>
            <div className='col-md-3'>
              <select
                name      = 'sparkling'
                className = 'form-control'
                value     = { this.state.sparkling }
                onChange  = { this.handleChange }
              >
                <option>--sparkling--</option>
                <option value = '1'>yes</option>
                <option value = '0'>no</option>
              </select>
            </div>
          </div>
        </form>
        <div className='results col-md-10 offset-md-1'>
          <div className='row titles'>
            <div className='col-md-3'>name</div>
            <div className='col-md-2 integer'>vintage</div>
            <div className='col-md-1'>color</div>
            <div className='col-md-2 integer'>stored</div>
            <div className='col-md-2'>family</div>
            <div className='col-md-1'>sparkling</div>
          </div>
            {this.state.bottles.map(bottle =>
              <div className='row result' key={ bottle.id }>
                <div className='col-md-3'>{ bottle.name }</div>
                <div className='col-md-2 integer'>{ bottle.vintage }</div>
                <div className='col-md-1'>{ bottle.color }</div>
                <div className='col-md-2 integer'>{ bottle.stored }</div>
                <div className='col-md-2'>{ bottle.family }</div>
                <div className='col-md-1'>{ bottle.sparkling }</div>
              </div>
            )}
          </div>
      </div>
    )
  }
}

export default BottleSearch;
