import React from 'react'
import '../css/PageNotFound.css'

const PageNotFound = function(){
    return (
        <div className="notfound">
            <div className="background-wrapper">
                <h1 id="visual">404</h1>
            </div>
            <p>The page you’re looking for does not exist.</p>
        </div>
    );
}

export default PageNotFound;