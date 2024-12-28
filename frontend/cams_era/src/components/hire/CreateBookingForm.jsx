import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your API base URL

const CreateBookingForm = ({ photographerId }) => {
  const [formData, setFormData] = useState({
    userInfo: { name: '', phone: '', email: '' },
    eventDetails: { eventType: '', date: '', time: '', duration: '', location: { venueName: '', address: '', city: '', state: '', zipCode: '' } },
    photographyRequirements: { package: '', specialRequirements: '', numberOfPeople: '' },
    additionalNotes: '',
  });

  const [isBookingCreated, setIsBookingCreated] = useState(false); // Track booking creation status

  const handleChange = (e, group, subGroup = null) => {
    const { name, value } = e.target;

    if (subGroup) {
      setFormData({
        ...formData,
        [group]: {
          ...formData[group],
          [subGroup]: {
            ...formData[group][subGroup],
            [name]: value,
          },
        },
      });
    } else if (group) {
      setFormData({
        ...formData,
        [group]: { ...formData[group], [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming user token is stored in localStorage
      console.log(token);
      await axios.post(
        `${BASE_URL}/bookings/request`,
        { ...formData, photographer: photographerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsBookingCreated(true); // Set booking created status to true
    } catch (error) {
      console.error('Error creating booking:', error.response?.data?.message || error.message);
    }
  };

  if (isBookingCreated) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">Booking Created Successfully!</h2>
        <p>Your booking has been successfully submitted. We will contact you soon!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create a Booking</h2>
      
      <div>
        <h3>User Information</h3>
        <input name="name" placeholder="Name" onChange={(e) => handleChange(e, 'userInfo')} required />
        <input name="phone" placeholder="Phone" onChange={(e) => handleChange(e, 'userInfo')} required />
        <input name="email" placeholder="Email" onChange={(e) => handleChange(e, 'userInfo')} />
      </div>

      <div>
        <h3>Event Details</h3>
        <input name="eventType" placeholder="Event Type" onChange={(e) => handleChange(e, 'eventDetails')} required />
        <input name="date" type="date" placeholder="Date" onChange={(e) => handleChange(e, 'eventDetails')} required />
        <input name="time" type="time" placeholder="Time" onChange={(e) => handleChange(e, 'eventDetails')} required />
        <input name="duration" placeholder="Duration (e.g., 2 hours)" onChange={(e) => handleChange(e, 'eventDetails')} required />
        
        <h4>Location</h4>
        <input name="venueName" placeholder="Venue Name" onChange={(e) => handleChange(e, 'eventDetails', 'location')} required />
        <input name="address" placeholder="Address" onChange={(e) => handleChange(e, 'eventDetails', 'location')} required />
        <input name="city" placeholder="City" onChange={(e) => handleChange(e, 'eventDetails', 'location')} required />
        <input name="state" placeholder="State" onChange={(e) => handleChange(e, 'eventDetails', 'location')} required />
        <input name="zipCode" placeholder="Zip Code" onChange={(e) => handleChange(e, 'eventDetails', 'location')} required />
      </div>

      <div>
        <h3>Photography Requirements</h3>
        <input name="package" placeholder="Package" onChange={(e) => handleChange(e, 'photographyRequirements')} required />
        <input name="specialRequirements" placeholder="Special Requirements" onChange={(e) => handleChange(e, 'photographyRequirements')} />
        <input name="numberOfPeople" type="number" placeholder="Number of People" onChange={(e) => handleChange(e, 'photographyRequirements')} />
      </div>

      <div>
        <h3>Additional Notes</h3>
        <textarea name="additionalNotes" placeholder="Additional Notes" onChange={handleChange}></textarea>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit Booking</button>
    </form>
  );
};

export default CreateBookingForm;
