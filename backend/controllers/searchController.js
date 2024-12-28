const Photographer = require('../models/photographerModel');

// Search photographers based on query parameters
const searchPhotographers = async (req, res) => {
    try {
        const { name, location, services } = req.query;

        // Ensure at least one query parameter is provided
        if (!name && !location && !services) {
            return res.status(400).json({ message: 'Please provide at least one search parameter' });
        }

        // Create a search object to filter based on user input
        let searchCriteria = {};

        // Case-insensitive search for name
        if (name) {
            searchCriteria.name = { $regex: name, $options: 'i' };
        }

        // Case-insensitive search for location
        if (location) {
            searchCriteria.location = { $regex: location, $options: 'i' };
        }

        // Case-insensitive search for services (assuming services is an array of objects with a 'name' field)
        if (services) {
            searchCriteria['services.name'] = { $regex: services, $options: 'i' }; // Updated line
        }

        // Fetch photographers based on search criteria
        const photographers = await Photographer.find(searchCriteria);

        // Check if any photographers are found
        if (!photographers || photographers.length === 0) {
            return res.status(404).json({ message: 'No photographers found' });
        }

        // Return the found photographers
        res.status(200).json({ photographers });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { searchPhotographers };
