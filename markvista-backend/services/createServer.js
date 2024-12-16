import mongoose from "mongoose";

export default function createServer(
  app,
  port,
  name,
  withDatabaseConnection = true
) {
  process.on("uncaughtException", (err) => {
    console.log(err.stack);
    console.log("UNCAUGHT EXCEPTION: Shutting Down...");
    process.exit(1);
  });

  // Local Database
  // const databse = process.env.DATABASE_LOCAL;

  // if (withDatabaseConnection)
  //   mongoose
  //     .connect(databse, {
  //       dbName: process.env.DB_NAME,
  //       serverSelectionTimeoutMS: 5000, // Time limit for initial connection
  //     })
  //     .then(() => {
  //       console.log("Connection to database Successfull");
  //     })
  //     .catch((err) => {
  //       console.log("Something went wrong: ", err.message);
  //       // console.log(err);
  //     });

  // Cloud Database Connection
  if (withDatabaseConnection)
    mongoose
      .connect(process.env.DATABASE_ATLAS)
      .then(() => {
        console.log("Connection to database Successfull");
      })
      .catch((err) => {
        console.log("Something went wrong: ", err.message);
        console.log(err);

        // console.log(err);
      });

  const server = app.listen(port, () => {
    console.log(`Listening for requests ${port}...`);
    console.log(`*************_${name}_************`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION: Shutting Down.....");
    server.close(() => process.exit(1));
  });
}
