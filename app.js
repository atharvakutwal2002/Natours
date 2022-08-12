const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.use(express.json());

//middleware
app.use(morgan('dev'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).send({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: ' Invalid id ',
    });
  }

  res.status(200).send({
    status: 'success',
    tour,
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: ' Invalid id ',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ....> ',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: ' Invalid id ',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers=(req,res)=>{
  res.status(500).json({
    status:'error',
    message :'This route is not yet defined'
  })
}
const getUser=(req,res)=>{
  res.status(500).json({
    status:'error',
    message :'This route is not yet defined'
  })
}
const createUser=(req,res)=>{
  res.status(500).json({
    status:'error',
    message :'This route is not yet defined'
  })
}
const updateUser=(req,res)=>{
  res.status(500).json({
    status:'error',
    message :'This route is not yet defined'
  })
}
const deleteUser=(req,res)=>{
  res.status(500).json({
    status:'error',
    message :'This route is not yet defined'
  })
}



app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .delete(deleteTour)
  .get(getTour)
  .patch(updateTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
