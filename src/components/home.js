import React from "react";

// const Home = () => <div>Welcome to bottlefinder.com</div>;

// function Home(){
//   return <div>Welcome to bottlefinder.com</div>
// }

const ListWrapper = props => {
  return <ul>{props.children}</ul>;
};

class List extends React.Component {
  render() {
    // return [<li key={0}>hello</li>, <li key={1}>world</li>, <li key={2}>!</li>];
    return (
      // can write <>
      <React.Fragment>
        <li>hello</li>
        <li>world</li>
        <li>!</li>
      </React.Fragment>
    );
  }
}

function MyFunc(props) {
  console.log("MyFunc.render");
  return <div>{props.count}</div>;
}

const MyFunc2 = React.memo(MyFunc);

//class Home extends React.PureComponent {
class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = { count: 0 };
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

    this.setState({ count: 1 });
  };

  // class method
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   //return nextState.count % 10 === 0
  //   // return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  //   // return true
  // }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.onClick}>click me</button>
        <p>{this.state.count}</p>
        <MyFunc2 count={this.state.count} />
        <List />
        <ListWrapper>
          <li>test 1</li>
          <li>test 2</li>
        </ListWrapper>

        <ListWrapper
          children={
            <React.Fragment>
              <li>test 1</li> <li>test 2</li>
            </React.Fragment>
          }
        />

        <ListWrapper />
      </div>
    );
  }
}

export default Home;
