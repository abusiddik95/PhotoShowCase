import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header">
               <div className="container">
                   <div className="row">
                       <div className="col col-auto my-auto">
                           <a href="/" className="logo">PhotoShowCase</a>
                       </div>
                       <div className="col my-auto text-right">
                           <div className="mainmenu">
                               <ul>
                                   <li><a href="/">Home</a></li>
                                   <li><a href="/about">about</a></li>
                                   <li><a href="/disclaimer">desclimer</a></li>
                                   <li><a href="/credit">credit</a></li>
                               </ul>
                           </div>
                       </div>
                   </div>
               </div>
            </header>
        );
    }
}

export default Header;