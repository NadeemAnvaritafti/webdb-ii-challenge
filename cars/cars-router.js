const express = require('express');

const db = require('../data/db-config');

const router = express.Router();


// ---------------------------- GET ------------------------- //
router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        if (cars.length === 0) {
            res.status(200).json({ message: 'No cars available in the database; Please add car data' })
        } else {
            res.status(200).json(cars);
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to retrieve cars data' })
    })
})


router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
    .where({ id })
    .first()
    .then(car => {
        if (!car) {
            res.status(404).json({ message: 'invalid car id' })
        } else {
            res.status(200).json(car);
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to retrieve car data' })
    })
})


// --------------------------------- POST ------------------------------ //
router.post('/', validateCar, (req, res) => {
    const carData = req.body;
    db('cars')
    .insert(carData)
    .then(ids => {
        db('cars')
        .where({ id: ids[0] })
        .then(car => {
            res.status(201).json(car);
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Failed to add car data' })
    })
})



// --------------------------- PUT ------------------------------ //
router.put('/:id', validateCar, (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    db('cars')
    .where({ id })
    .update(carData)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: `${count} record updated` });
        } else {
            res.status(404).json({ message: 'car not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error updating the car data' });
    })
})



// ----------------------------- DELETE ------------------------------ //
router.delete('/:id', (req, res) => {
    let deletedCarObject = {};
    db('cars')
    .where({ id: req.params.id })
    .then(car => {
        deletedCarObject = car;
        deletedCarObject[0].deleted = 'Record Deleted'
    })
    db('cars')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if (count > 0) {
            res.status(200).json(deletedCarObject[0]);
        } else {
            res.status(404).json({ message: 'car not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'Error deleting the car data' });
    })
})




// ----------------------- CUSTOM MIDDLEWARE ------------------------ //
function validateCar(req, res, next) {
    const carData = req.body;
    if (!carData) {
        res.status(400).json({ error: 'missing car data' })
    } else if (!carData.VIN) {
        res.status(400).json({ error: 'missing required VIN number' })
    } else if (!carData.make) {
        res.status(400).json({ error: 'missing required Make of car' })
    } else if (!carData.model) {
        res.status(400).json({ error: 'missing required Model of car' })
    } else if (!carData.mileage) {
        res.status(400).json({ error: 'missing required Mileage of car' })
    } else if (carData.VIN && carData.VIN.length !== 17) {
        res.status(400).json({ error: 'invalid VIN number; must be 17 characters' })
    } else {
        next();
    }
}



module.exports = router;