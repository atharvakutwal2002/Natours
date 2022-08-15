const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//importing data in DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
    process.exit()
  } catch (error) {
    console.log(error);
  }
};
//delete all data form db
const deleteData = async () => {
  try {
    await Tour.deleteMany(tours);
    console.log('Data successfully deleted');
    process.exit()
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
  
} else if (process.argv[2] === '--delete') {
  deleteData();
}
