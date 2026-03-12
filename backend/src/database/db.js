import mongoose from "mongoose";

async function connectMongoDb() {
  return mongoose
    .connect(
      "mongodb+srv://jarathod_db_user:U5D29Bv7PZKayBBZ@cluster0.wdabcyr.mongodb.net"
    )
    .then(console.log("Database is connected"))
    .catch((err) => {
      console.log("Getting Errors: ", err);
    });
}

export default connectMongoDb;
