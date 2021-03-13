const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    year: Number,
    licensePlate: String,
    model: String,
    color: String
});

const CarModel = mongoose.model('car', CarSchema);

module.exports = {
    CarModel,
    CarSchema
}