import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css'
const NotFound = () => {
    return (
        <div>
            <h1 className='text-notfound'>404 Error Not Found Page ! </h1>
            <section class="error-container">
                <span class="four"><span class="screen-reader-text">4</span></span>
                <span class="zero"><span class="screen-reader-text">0</span></span>
                <span class="four"><span class="screen-reader-text">4</span></span>
            </section>
            <div class="link-container">
                <Link to='/' class="more-link">Home Page</Link>
            </div>
        </div>
    );
}; 

export default NotFound;