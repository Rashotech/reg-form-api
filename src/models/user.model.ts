import { Schema, model } from "mongoose";

// An interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  accountNo: string;
}

// A Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  course: { type: String },
  accountNo: { type: String, unique: true, required: true },
});

// User Model.
const User = model<IUser>("User", userSchema);

export default User;

