import React, { useState } from 'react';
import './assets/css/homeView.css';
import { tinyApi } from "../handleApi/mpesa";
import {ClipLoader} from "react-spinners";
import ReactPlayer from "react-player"
import AviatorPredictor from "./AviatorPredictor";
import {Amount} from "./Amount";

const HomeView = () => {
    // const data =

    const data = sessionStorage.getItem('amount');
    console.log(data);
    const startAmount = 100;
    const goldAmount = 500;
    const premiumAmount = 1000;
    const [selectedTier, setSelectedTier] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPaymentDone, setIsPaymentDone] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelectTier = (tier: string, amount: string) => {
        setSelectedTier(tier);

    };

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            if (phoneNumber) {
                const apiEndpoint = 'http://192.168.43.76:8000/api/stk-push';

                const requestData = {
                    phoneNumber: phoneNumber,
                    amount: data,
                };

                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.message);
                    if (responseData.paid) {
                        setIsPaymentDone(true);
                        console.log('you will be redirected in the next 10 seconds');
                    } else {
                        console.log('you will be redirected to payment');
                    }
                } else {
                    console.log('Error Status:', response.status);
                }
            } else {
                alert('Phone number is required');
            }
        } catch (error) {
            console.error('API Error:', error);
            // Handle the error
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <nav>
        {/*<span className="menu-icon" onClick={toggleMenu}>*/}
        {/*  &#9776;*/}
        {/*</span>*/}
                <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <a href="#about" onClick={toggleMenu}>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#subscription" onClick={toggleMenu}>
                            Subscription
                        </a>
                    </li>
                    <li>
                        <a href="#contact" onClick={toggleMenu}>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>

            <div id="about">
                <h1 className={`title`}>Welcome to AviatorBot AI!</h1>
                <p className="paragraph">New to AviatorBot AI?
                    AviatorBot AI is an advanced artificial intelligence system developed to enhance the player's
                    experience and performance in the popular "Aviator" game. This AI leverages state-of-the-art
                    machine learning and predictive modeling techniques to provide real-time assistance and guidance
                    to players, making the game more enjoyable and challenging. With AviatorBot AI, you can make a
                    daily payment and start experiencing the winning streak with only. Your payment resets at midnight,
                    giving you the opportunity to continuously improve your skills and achieve better results.
                    Join the AviatorBot AI community today and take your gaming experience to new heights!</p>
                <div className="video">
                    <ReactPlayer className="video-player" url="https://vimeo.com/894950077?share=copy"
                    controls={true}
                    />
                </div>

            </div>
            {isPaymentDone ? (
                <div>
                    <h1>GET ODDS</h1>
                    <AviatorPredictor />
                </div>
            ): <div>

                <h1>if You've already paid, click continue and enter your number to proceed.</h1>
                <section className={`subscription-plans-section`}>
                    <div className={`subscription-plans`}>
                        <div className={`subscription`}>
                            <h2>New to AviatorBot AI? </h2>
                            <p>Make a daily payment of KES 100 and start
                                experiencing the winning streak. Your Payment resets at midnight.</p>

                            <p>KSH {startAmount}</p>
                            <button onClick={() => handleSelectTier('Starter', startAmount.toString())}>Continue</button>

                        </div>

                    </div>
                    {selectedTier && (
                        <div className={`subscription-payment`}>
                            <p><h2>NB: </h2>if You've already paid or unpaid, <h4>Amount: {startAmount}</h4> enter your number here to proceed.</p>
                            {/*<h3>Selected Package: {selectedTier}</h3>*/}
                            <input type="text" placeholder="Enter m-pesa number 0712345678" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <button type="submit" className="login-button" disabled={loading}
                                    onClick={handleSubscribe}>
                                {loading ? (
                                    <ClipLoader color="white" loading={loading} size={30}/>
                                ) : (
                                    'Proceed'
                                )}
                            </button>
                        </div>
                    )}
                </section>
            </div> }


            <div id="about-aviator">
                <h2>About AviatorBot AI</h2>
                <p>
                    The "AviatorBot AI" is an advanced artificial intelligence system developed to enhance the player's
                    experience and performance in the popular "Aviator" game. This AI leverages state-of-the-art machine
                    learning and predictive modeling techniques to provide real-time assistance and guidance to players,
                    making the game more enjoyable and challenging.
                </p>
            </div>

            <div id="contact">
                <h2>Contact Us</h2>
                <p>If you have any questions, feel free to contact us at support@example.com.</p>
            </div>

            <footer>
                <p>&copy; 2023 AviatorBot AI. All rights reserved.</p>
                <ul>
                    <li>
                        <a href="#terms">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#privacy">Privacy Policy</a>
                    </li>
                </ul>
            </footer>


        </div>
    );
};

export default HomeView;