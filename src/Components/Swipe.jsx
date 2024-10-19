import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import '../Swipe.css';
import axios from 'axios';  // For backend communication

const Swipe = () => {
    const [clothes, setClothes] = useState([]);  // Store clothes items from JSON
    const [currentIndex, setCurrentIndex] = useState(0);  // Track the current index
    const [prediction, setPrediction] = useState(null);  // Store the prediction from Flask

    // Handle the swipe event
    const handleSwipe = async (direction, item) => {
        console.log(`Swiped ${direction} on ${item.productDisplayName} with id ${item.id}`);
        
        // Log the payload to confirm it is correct
        console.log({
            id: item.id,
            title: item.productDisplayName,
            direction: direction
        });
    
        // Send the swipe data to the backend including id
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                id: item.id,
                title: item.productDisplayName,
                direction: direction
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Prediction from backend:', response.data);
            setPrediction(response.data);
        } catch (error) {
            console.error('Error sending swipe data:', error);
        }
    
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
                const response = await fetch('/clothes_2.json'); // Fetch from the public folder
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
                        key={clothes[currentIndex].id}  // Use id as key
                        preventSwipe={["down"]}
                        onSwipe={(dir) => handleSwipe(dir, clothes[currentIndex])}  // Pass the entire item to handleSwipe
                    >
                        <div
                            style={{ backgroundImage: `url(${clothes[currentIndex].link})` }}
                            className="card"
                        >
                            <h3>{clothes[currentIndex].productDisplayName}</h3>  {/* Display title */}
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