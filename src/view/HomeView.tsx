import React, { useState } from 'react';
import './homeView.css';

const HomeView = () => {
    const [selectedTier, setSelectedTier] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelectTier = (tier: string) => {
        // setSelectedTier(tier);
    };

    const handleSubscribe = () => {
        console.log(`Subscribing to ${selectedTier} tier...`);
        // Implement subscription logic (e.g., redirect to payment page)
    };

    return (
        <div>
            <nav>
        <span className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </span>
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
                <h1>Welcome to AviatorBot AI!</h1>
                <p>
                    New to AviatorBot AI? Make a daily payment of KES 100 and start experiencing the winning streak.
                    Your payment resets at midnight.
                </p>
                <video width="320" height="240" controls>
                    <source src="./video/avpr.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <a href="#subscription" onClick={() => handleSelectTier('Starter')}>
                    <button>Get Started</button>
                </a>
            </div>

            <div>
                <h1>Subscription Plans</h1>
                <div>
                    <div>
                        <h2>Starter</h2>
                        <p>Basic features</p>
                        <button onClick={() => handleSelectTier('Starter')}>Select</button>
                    </div>
                    <div>
                        <h2>Diamond</h2>
                        <p>Advanced features</p>
                        <button onClick={() => handleSelectTier('Diamond')}>Select</button>
                    </div>
                    <div>
                        <h2>Gold</h2>
                        <p>Premium features</p>
                        <button onClick={() => handleSelectTier('Gold')}>Select</button>
                    </div>
                </div>
                {selectedTier && (
                    <div>
                        <h3>Selected Tier: {selectedTier}</h3>
                        <button onClick={handleSubscribe}>Subscribe Now</button>
                    </div>
                )}
            </div>

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