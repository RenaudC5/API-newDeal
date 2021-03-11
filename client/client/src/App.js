import './style.css'
import Country from './Country'

import Menu from './Menu'

import {BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
        <Menu/>
        <div className="container">
            <div class="row">
                    <Route path="/country" exact component={Country}/>
               </div>
            </div>
        </Router>
    </div>
  );
}

export default App;
