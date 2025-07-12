import app from "./app.js";
import dotenv from "dotenv";
import connectToDatabase from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
connectToDatabase();

app.listen(PORT,'0.0.0.0',() => {
    console.log(`→_→ 🌍 🖥️ Server running on http://localhost:${PORT} 🚀 ^_____^;)`);
});
