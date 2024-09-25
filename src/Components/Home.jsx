import React from "react";
import '../Home.css';
import tshirts from '../assets/tshirts_card.jpeg';
import jackets from '../assets/jackets_card.jpeg';
import skirt from '../assets/skirt_card.jpeg';
import pants from '../assets/pants_card.jpeg';
import dress from '../assets/dress_card.jpeg';
import ath from '../assets/ath_card.jpeg';
import logo from '../assets/Logo1.png'

const Home = () => {
  return (
    <>
      <div className="cardWide">
        <img src={logo} className="card-img" alt="Wide Card" />
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="cardimg">
            <img src={tshirts} className="card-img-top" alt="Tshirts" />
            <div className="card-overlay">
              <span className="card-text">T-Shirts</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="cardimg">
            <img src={jackets} className="card-img-top" alt="Jackets" />
            <div className="card-overlay">
              <span className="card-text">Jackets</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="cardimg">
            <img src={skirt} className="card-img-top" alt="Skirts" />
            <div className="card-overlay">
              <span className="card-text">Skirts</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="cardimg">
            <img src={pants} className="card-img-top" alt="Pants" />
            <div className="card-overlay">
              <span className="card-text">Pants</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="cardimg">
            <img src={dress} className="card-img-top" alt="Dresses" />
            <div className="card-overlay">
              <span className="card-text">Dresses</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="cardimg">
            <img src={ath} className="card-img-top" alt="Athleisure" />
            <div className="card-overlay">
              <span className="card-text">Athleisure</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;