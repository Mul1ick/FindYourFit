import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import '../Swipe.css';
import { collection, onSnapshot } from 'firebase/firestore';  // Import Firestore functions
import database from '../firebase';  // Import the Firestore instance
import axios from 'axios';  // Import axios for API requests

const Swipe = () => {
    const [clothes, setClothes] = useState([]);  // Store clothes items from Firestore
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
        // Reference to the 'clothes' collection in Firestore
        const clothesCollectionRef = collection(database, 'clothes');

        // Setup a real-time listener to Firestore
        const unsubscribe = onSnapshot(clothesCollectionRef, (snapshot) => {
            const clothesList = snapshot.docs.map((doc) => doc.data());
            setClothes(clothesList);  // Set clothes list from Firestore
            setCurrentIndex(0);  // Reset to the first item
        });

        // Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className="cardContainer">
                {clothes.length > 0 && currentIndex < clothes.length && (
                    <TinderCard
                        className="swipe"
                        key={clothes[currentIndex].Title}
                        preventSwipe={["down"]}
                        onSwipe={(dir) => handleSwipe(dir, clothes[currentIndex].Title)}
                    >
                        <div
                            style={{ backgroundImage: `url(${clothes[currentIndex].pic})` }}
                            className="card"
                        >
                            <h3>{clothes[currentIndex].Title}</h3>
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