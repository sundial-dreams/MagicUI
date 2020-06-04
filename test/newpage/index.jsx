import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default class App extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
     return (
       <div className="WIDGET-pc_widget-0"><div className="SHAPE-circle-1"></div>
<button className="BUTTON-custom_button-2">Button</button>
<div className="TEXT-label-3">JavaScript is best language</div>
<div className="SHAPE-rect-4"><img className="IMAGE-custom_image-5" src="http://localhost:9000/image/anime-2.jpeg" alt="none"/>
<button className="BUTTON-custom_button-6">Button</button>
<div className="TEXT-text-7">some text here</div></div></div>
     )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));