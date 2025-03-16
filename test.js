require("dotenv").config({ path: ".env.local" });

console.log("MONGODB_URI:", process.env.MONGODB_URI);
