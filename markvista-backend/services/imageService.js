import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
config({ path: "./config.env" });

const app = express();
app.use(morgan("dev"));
app.use("/profile-images", express.static(process.env.PROFILE_IMG_PATH));
app.use("/community-images", express.static(process.env.COMMUNITY_IMG_PATH));

app.get("/test-image", (req, res) => {
  res.sendFile(
    process.env.PROFILE_IMG_PATH + "/user_66acccd26b60720f86ee5a8d.jpg"
  ); // Replace with an actual file name
});

app.get("/", (req, res) => {
  res.send("Welcome to Images Server");
});

const port = process.env.IMAGE_PORT || 1511;
app.listen(port, () => console.log(`Image Server running on port ${port}`));
