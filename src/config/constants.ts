import dotenv from 'dotenv';
dotenv.config();

const configs = {
    mail: {
        sender: process.env.MAIL_SENDER!,
        address: process.env.MAIL_ADDRESS!,
        api_key: process.env.MAILAPIKEY!,
        domain: process.env.MAILDOMAIN!,
    },
    db: {
        development: process.env.DB_STRING!,
        production: process.env.DB_STRING_PROD!,
        test: process.env.DB_STRING_TEST!,
    },
    env: process.env.NODE_ENV
}

export default configs;