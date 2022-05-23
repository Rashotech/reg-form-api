import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import configs from '../config/constants';
import User from '../models/user.model';

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
    connect(configs.db.production)
    .then(() => {
        console.log("Connected to MongoDB...");
        CreateAccount();
    })
    .catch(err => console.error("Could not connect to db", err));
} else {
    connect(configs.db.development)
    .then(() => {
        console.log("Connected to MongoDB...");
        CreateAccount();
    })
    .catch(err => console.error("Could not connect to db", err));
};


// Create Test Account
const CreateAccount = async () => {
    await User.deleteMany({});
    await User.insertMany([
        { accountNo: "1101812290" },
        { accountNo: "1115254608" },
        { accountNo: "1115254609" },
    ])
    console.log('Test Accounts Created');
};