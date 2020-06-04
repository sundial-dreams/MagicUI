import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default class App extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
     return (
       <div className="WIDGET-pc_widget-0"><button className="BUTTON-custom_button-1">new button</button>
<div className="SHAPE-rect-2"></div></div>
     )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));