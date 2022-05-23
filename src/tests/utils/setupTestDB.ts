import mongoose from 'mongoose';
import configs from '../../config/constants';

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(configs.db.test);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany({})));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;