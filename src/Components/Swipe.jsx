import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import '../Swipe.css';
import axios from 'axios';  // For backend communication

const Swipe = () => {
    const [clothes, setClothes] = useState([]);  // Store clothes items from JSON
    const [currentIndex, setCurrentIndex] = useState(0);  // Track the current index
    const [prediction, setPrediction] = useState(null);  // Store the prediction from Flask

    // Handle the swipe event
    const handleSwipe = async (direction, Title) => {
        console.log(`Swiped ${direction} on ${Title}`);
        
        // Send the swipe data to the backend
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                title: Title,
                direction: direction // Send swipe direction
            });
            console.log('Prediction from backend:', response.data);
            setPrediction(response.data); // Set the prediction
        } catch (error) {
            console.error('Error sending swipe data:', error);
        }
        
        // After a swipe, move to the next item
        if (currentIndex < clothes.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            console.log('No more items to display');
        }
    };

    useEffect(() => {
        // Fetch data from the local JSON file
        const fetchData = async () => {
            try {
                const response = await fetch('/clothes.json'); // Fetch from the public folder
                const data = await response.json();
                setClothes(data);  // Set clothes list from JSON
                setCurrentIndex(0);  // Reset to the first item
            } catch (error) {
                console.error('Error fetching clothes data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="cardContainer">
                {clothes.length > 0 && currentIndex < clothes.length && (
                    <TinderCard
                        className="swipe"
                        key={clothes[currentIndex].productDisplayName}
                        preventSwipe={["down"]}
                        onSwipe={(dir) => handleSwipe(dir, clothes[currentIndex].productDisplayName)}
                    >
                        <div
                            style={{ backgroundImage: `url(${clothes[currentIndex].link})` }}
                            className="card"
                        >
                            <h3>{clothes[currentIndex].productDisplayName}</h3>
                        </div>
                    </TinderCard>
                )}
            </div>

            {prediction && (
                <div className="prediction">
                    <p>Prediction from Flask: {prediction}</p>
                </div>
            )}
        </>
    );
}

export default Swipe;