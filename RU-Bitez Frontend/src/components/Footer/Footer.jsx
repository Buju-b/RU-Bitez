import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                
                <p> RU-Bitez is a seamleass food-ordering web application aimed at improving the dining experience at the Riara University Cafeteria</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>

            </div>
            <div className="footer-content-center">
                <li>Home</li>
                <li>About Us</li>
                <li>Privacy Policy</li>

            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>+254-799-686-378</li>
                    <li>contact@rubitez.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 @ rubitez.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer