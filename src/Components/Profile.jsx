import React from "react";
import '../Profile.css';

const Profile = () => {
  // Assuming you have the user's name to extract initials
  const userName = "John Doe"; // Example user name
  const userInitials = userName.split(' ').map(name => name[0]).join('');

  return (
    <div className="profile-page">
      

      <div className="profile-container">
        <h2 className="profile-heading">My Profile</h2>
        {/* User Initials Icon */}
      <div className="user-icon">
        {userInitials}
      </div>
        
        <div className="profile-section">
          <h3 className="section-title">Address</h3>
          <div className="section-content">
            <p>Home: Address not Set</p>
            <p>Office:Address not set yet</p>
            <button className="section-button">Manage Addresses</button>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Payment Methods</h3>
          <div className="section-content">
            <button className="section-button">Add a Payment Method</button>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Past Orders</h3>
          <div className="section-content">
            <p>Your past orders will appear here</p>
            <button className="section-button">View All Orders</button>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Account Settings</h3>
          <div className="section-content">
            <p>Email: ************@example.com</p>
            <p>Phone: </p>
            <button className="section-button">Edit Account Details</button>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Your most chosen website</h3>
          <div className="section-content">
            <p>Website 1</p>
            <p>Website 2</p>
            <button className="section-button">Manage Websites</button>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Help & Support</h3>
          <div className="section-content">
            <button className="section-button">Get Help</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;