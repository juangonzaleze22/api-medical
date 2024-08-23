import { Schema, model } from "mongoose";
import { Cite } from "../interfaces/cite.interface";

const CiteSchema = new Schema<Cite>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    imageUrl: {
      type: String,  
    },
    user:{
      type: Object
    },
    status:{
      type: String
    },
    reason_cancel: { 
      type: String
    },
    medical_response: { 
      type: Object
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CiteModel = model("cites", CiteSchema);
export default CiteModel;