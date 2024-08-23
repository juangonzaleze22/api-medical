import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    displayName: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isGoogle: { 
      type: Boolean
    },
    photoURL: {
      type: String,  
    },
    isAdmin: { 
      type: Boolean,  
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;