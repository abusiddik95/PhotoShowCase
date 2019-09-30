import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import LatestPhotos from './components/LatestPhotos'
import './App.css';
import Disclaimer from './components/Disclaimer';
import Credit from './components/Credit';
import About from './components/About';
import Photo from './components/Photo';

function App() {
  return (
    <Router>
    <div className="App">
        <Header />
        <div className="content-block">
          <div className="container">
            <div className="row">
              <div className="col">
                <Route exact path="/" render={props=> (
                 <LatestPhotos />
                )}/>
                  

              <Route path="/about" component={About} />
              <Route path="/disclaimer" component={Disclaimer} />
              <Route path="/credit" component={Credit} />
              <Route path="/photo" component={Photo} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;