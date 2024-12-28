const Portfolio = require('../models/portfolioModel');
const Photographer = require('../models/photographerModel');

// Get portfolio items by photographer ID
exports.getPortfolioByPhotographerId = async (req, res) => {
    try {
        const { photographerId } = req.params;
        const portfolios = await Portfolio.find({ photographer: photographerId });
        res.json(portfolios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new portfolio item
exports.addPortfolioItem = async (req, res) => {
    try {
        const { photographer } = req.photographer; // Use authenticated photographer ID
        const newPortfolioItem = new Portfolio({ ...req.body, photographer });
        const savedItem = await newPortfolioItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a portfolio item
exports.updatePortfolioItem = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
        if (portfolio.photographer.toString() !== req.photographer._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, req.body, { new: true });
        res.json(updatedPortfolio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a portfolio item
exports.deletePortfolioItem = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
        if (portfolio.photographer.toString() !== req.photographer._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Portfolio.findByIdAndDelete(portfolioId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

