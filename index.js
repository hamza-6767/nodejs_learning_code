console.log(">>> Server file loaded successfully");
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());


const cars = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
  { id: 2, make: 'Honda', model: 'Accord', year: 2019 },
  { id: 3, make: 'Ford', model: 'Mustang', year: 2021 },
      
];


// app.get('/', (req, res) => {
//   res.send('Hello, welcome to the Car API!');
// });


const router = express.Router();

// Get all cars
router.get('/', (req, res) => {
  res.json(cars);
});

// Get car by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find(car => car.id === id);
  if (!car) return res.status(404).send('Car not found');
  res.json(car);
});

router.post('/', (req, res) => {
  res.send('Car added successfully');
});
router.put('/:id', (req, res) => {
  res.send(`Car with ID updated successfully`);
});

router.delete('/:id', (req, res) => {
  res.send(`Car with ID deleted successfully`);
});



app.use('/api/v1/cars', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

