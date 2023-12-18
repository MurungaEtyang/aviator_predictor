import React, { useState } from 'react';
import './assets/css/homeView.css';
import { tinyApi } from "../handleApi/mpesa";
import {ClipLoader} from "react-spinners";
import ReactPlayer from "react-player"
// import {useHistory} from "react-router-dom";

const HomeView = () => {
    const startAmount = 200;
    const goldAmount = 500;
    const premiumAmount = 1000;
    // const history = useHistory();
    const [selectedTier, setSelectedTier] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentSuccesful, setPaymentSuccesful] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelectTier = (tier: string, amount: string) => {
        setSelectedTier(tier);
        setAmount(amount);
    };

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            if (phoneNumber) {
                const paymentResult = await tinyApi(phoneNumber, amount);
                console.log(paymentResult);


                if (paymentResult && paymentResult.response) {
                    const paymentData = paymentResult.response;


                    if (paymentData && paymentData.amount && paymentData.msisdn && paymentData.mpesa_receipt) {

                        await fetch('/.netlify/functions/savePaymentResponse', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                amount: paymentData.amount,
                                msisdn: paymentData.msisdn,
                                mpesa_receipt: paymentData.mpesa_receipt,
                            }),
                        }).then(response => {
                            if (response.ok) {
                                alert("Payment successful!");
                                setPaymentSuccesful(true)
                            }else {
                                console.log("Payment failed: " + response.status)
                            }

                            // history('./aviator-predictor')
                        });
                    } else {
                        alert("Incomplete or missing payment data");
                    }
                } else {
                    alert("Invalid payment result or missing response");
                }
            } else {
                alert('Phone number is required');
            }
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
                    daily payment and start experiencing the winning streak. Your payment resets at midnight,
                    giving you the opportunity to continuously improve your skills and achieve better results.
                    Join the AviatorBot AI community today and take your gaming experience to new heights!</p>
                <div className="video">
                    <ReactPlayer className="video-player" url="https://vimeo.com/894950077" />
                </div>

            </div>

            {paymentSuccesful &&
                <div>

                    <h1>Subscription Plans</h1>
                    <section className={`subscription-plans-section`}>
                        <div className={`subscription-plans`}>
                            <div className={`subscription`}>
                                <h2>Starter</h2>
                                <p>Basic features</p>
                                <p>100% sure odds</p>
                                <p>Daily payment</p>
                                <p>Daily Updates</p>
                                <p>KSH {startAmount}</p>
                                <button onClick={() => handleSelectTier('Starter', startAmount.toString())}>Select</button>
                            </div>
                            <div className={`subscription`}>
                                <h2>Diamond</h2>
                                <p>Advanced features</p>
                                <p>100% sure odds</p>
                                <p>Weekly payment</p>
                                <p>Daily Updates</p>
                                <p>KSH {goldAmount}</p>
                                <button onClick={() => handleSelectTier('Diamond', goldAmount.toString())}>Select</button>
                            </div>
                            <div className={`subscription`}>
                                <h2>Gold</h2>
                                <p>Premium features</p>
                                <p>100% sure odds</p>
                                <p>Monthly payment</p>
                                <p>Daily Updates</p>
                                <p>KSH {premiumAmount}</p>
                                <button onClick={() => handleSelectTier('Gold', premiumAmount.toString())}>Select</button>
                            </div>
                        </div>
                        {selectedTier && (
                            <div className={`subscription-payment`}>
                                <h3>Selected Package: {selectedTier}</h3>
                                <h4>Amount: {amount}</h4>
                                <input type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                <button type="submit" className="login-button" disabled={loading}
                                        onClick={handleSubscribe}>
                                    {loading ? (
                                        <ClipLoader color="#ffffff" loading={loading} size={30}/>
                                    ) : (
                                        'Pay Now'
                                    )}
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            }

            {paymentSuccesful &&
                <div>
                    <h1>payment successful</h1>
                </div>
            }

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