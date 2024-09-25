

import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import '../Swipe.css';
import dress1 from '../assets/dress1.jpeg';
import dress2 from '../assets/dress2.jpeg';
import { collection, onSnapshot } from 'firebase/firestore';  // Add this import
import database from '../firebase';



const Swipe = () => {
    const [clothes, setClothes] = useState([
        // {
        //     title: 'Dress1',
        //     pic: dress1
        // },
        // {
        //     title: 'Dress2',
        //     pic: dress2
        // } 
    ]);

    
    const handleSwipe = (direction, Title) => {
        console.log(`Swiped ${direction} on ${Title}`);
        
    };
 

    useEffect(() => {
        // Reference to the 'clothes' collection
        const clothesCollectionRef = collection(database, 'clothes');
        
        // Setup a real-time listener for the 'clothes' collection
        const unsubscribe = onSnapshot(clothesCollectionRef, (snapshot) => {
            const clothesList = snapshot.docs.map((doc) => doc.data());
            setClothes(clothesList);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

        



    return (
        <>
            <div className="cardContainer">
            {clothes.map(({ Title, pic }) => (
                <TinderCard
                    className="swipe"
                    key={Title}
                    preventSwipe={["down"]}
                    onSwipe={(dir) => handleSwipe(dir, Title)}
                    >
                    <div 
                        style={{ backgroundImage: `url(${pic})` }}
                        className="card">
                        <h3>{Title}</h3>
                    </div>
                </TinderCard>
            ))}
            </div>
            
        </>
    );
}

export default Swipe;