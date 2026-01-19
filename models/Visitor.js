import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

export default Visitor;
