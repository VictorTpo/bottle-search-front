import React from "react";

// const Home = () => <div>Welcome to bottlefinder.com</div>;

// function Home(){
//   return <div>Welcome to bottlefinder.com</div>
// }

function MyFunc(props){
  console.log('MyFunc.render')
  return(<div>{props.count}</div>)
}

const MyFunc2 = React.memo(MyFunc)

//class Home extends React.PureComponent {
class Home extends React.Component {
  constructor(props){
    super(props)
    console.log('constructor');
    this.state= {count: 0}
  }

  // variable method (cf instance method)
  onClick = () => {
    // this.setState({count: this.state.count + 1 })
    // this.setState({count: this.state.count + 1 })
    // this.setState(old_state => {
    //   return {count: old_state.count + 1}
    // })
    // this.setState(old_state => {
    //   return {count: old_state.count + 1}
    // })

    this.setState({count: 1})
  }

  // class method
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   //return nextState.count % 10 === 0
  //   // return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  //   // return true
  // }



  componentDidMount(){
    console.log('componentDidMount');
  }

  componentDidUpdate(){
    console.log('componentDidUpdate');
  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
  }

  render(){
    console.log('render');
    return(
      <div>
        <button onClick={this.onClick}>click me</button>
        <p>{this.state.count}</p>
        <MyFunc2 count={this.state.count}/>
      </div>
    )
  }
}

export default Home;
