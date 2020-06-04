import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default class App extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
     return (
       <div className="WIDGET-pc_widget-0"><div className="SHAPE-rect-1"><img className="IMAGE-custom_image-2" src="http://localhost:9000/image/anime-1.jpeg" alt="none"/>
<button className="BUTTON-custom_button-3">Button</button></div>
<div className="SHAPE-rect-4"><img className="IMAGE-custom_image-5" src="http://localhost:9000/image/anime-1.jpeg" alt="none"/>
<button className="BUTTON-custom_button-6">Button</button></div>
<div className="SHAPE-circle-7"></div>
<div className="TEXT-label-8">JavaScript is best language</div>
<input className="INPUT-custom_input-9" placeholder="some text"/>
<input className="INPUT-custom_input-10" placeholder="some text"/></div>
     )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));