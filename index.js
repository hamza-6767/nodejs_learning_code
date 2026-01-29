import express from 'express';

console.log(">>> Server file loaded successfully");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
  const  id =  parseInt(req.params.id, 10);
  const car = cars.find(car => car.id === id);  
  if (!car) {
    return res.status(404).send('Car not found');
  } 
  res.json(car);
});

router.post('/', (req, res) => {
  console.log("Incoming Headers:", req.headers);
  console.log("Incoming Body:", req.body);

  const { make, model, year } = req.body;

  // Validation
  if (!make || !model || !year) {
    return res.status(400).json({ error: 'Missing required fields: make, model, year' });
  }

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year: parseInt(year, 10)
  };

  cars.push(newCar);
  res.status(201).json(newCar);
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

