const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Retailer = require('./../../models/retailerModel');
const User = require('./../../models/userModel');
const Flyer = require('./../../models/flyerModel');
const Location = require('./../../models/locationModel');
const Offer = require('./../../models/offerModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// DATABASE CONNECTION
mongoose
  .connect(DB)
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => console.log('Error!'));

// READ JSON FILE
const retailer = JSON.parse(
  fs.readFileSync(`${__dirname}/retailers.json`, 'utf-8'),
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const flyers = JSON.parse(fs.readFileSync(`${__dirname}/flyers.json`, 'utf-8'));
const locations = JSON.parse(
  fs.readFileSync(`${__dirname}/location.json`, 'utf-8'),
);
const offers = JSON.parse(
  fs.readFileSync(`${__dirname}/offers-new.json`, 'utf-8'),
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await Retailer.create(retailer);
    // await User.create(users, { validateBeforeSave: false });
    // await Flyer.create(flyers);
    // await Location.create(locations);
    await Offer.create(offers);

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA INTO DB
const deleteData = async () => {
  try {
    // await Retailer.deleteMany();
    // await User.deleteMany();
    // await Flyer.deleteMany();
    // await Location.deleteMany();
    await Offer.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// node ./dev-data/data/import-dev-data --delete
// node ./dev-data/data/import-dev-data --import
