# Express Media Manager

## Basic Express JS Config
A express basic config is required.
```js

// server.js with music-metadata and /music/upload route  
import express from "express";  
import path from "path";  
import { engine } from "express-handlebars";  
import { fileURLToPath } from "url";  
import fs from "fs";  
import multer from "multer";  
import dotenv from "dotenv";  
import { parseFile } from "music-metadata";  
  
// Load environment variables  
dotenv.config();  
  
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);  
const CONFIG_PATH = path.join(__dirname, "config", "media_paths.json");  
const DB_PATH = path.join(__dirname, "media.db");  
const INIT_SQL = path.join(__dirname,"init.sql");  
const VIEWS_DIR = path.join(__dirname, "views");  
const PARTIALS_DIR = path.join(VIEWS_DIR, "partials");  
  
let mediaPaths = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));  
  
Object.entries(mediaPaths).forEach(([type, subpath]) => {  
    if (type === "base") return;  
    const fullPath = path.join(mediaPaths.base, subpath);  
    if (!fs.existsSync(fullPath)) {  
        fs.mkdirSync(fullPath, { recursive: true });  
        console.log(`Created folder: ${fullPath}`);  
    }  
});  
  
const app = express();  
const PORT = process.env.PORT || 3003;  
  
  
app.engine("html", engine({ extname: ".html", defaultLayout: false, partialsDir: PARTIALS_DIR }));  
app.set("view engine", "html");  
app.set("views", VIEWS_DIR);  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use("/public", express.static(path.join(__dirname, "public")));  
  
Object.entries(mediaPaths).forEach(([type, folder]) => {  
    if (type !== "base") {  
        app.use(`/media/${type}`, express.static(path.join(mediaPaths.base, folder)));  
    }  
});  
  
const upload = multer({ dest: path.join(__dirname, "tmp") });  
  
app.get("/", (req, res) => res.render("index"));  
app.get("/add", (req, res) => res.render("add"));  
  
const server = app.listen(PORT, () => {  
    console.log(`Server running at http://localhost:${PORT}`);  
});  
  
function shutdown() {  
    console.log("Shutting down server...");  
    server.close(() => {  
        console.log("Server closed.");  
        process.exit(0);  
    });  
}  
process.on("SIGINT", shutdown);  
process.on("SIGTERM", shutdown);  
process.on("message", (msg) => msg === "shutdown" && shutdown());
```



## DB 
### Init.sql
```sql
-- Table for Movies
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER,
    genre TEXT,
    path TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for TV Shows
CREATE TABLE IF NOT EXISTS shows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    season INTEGER,
    episode INTEGER,
    path TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Games
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    platform TEXT,
    path TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Photos
CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    taken_at TIMESTAMP,
    path TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Videos (home videos, etc.)
CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    path TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Podcasts
CREATE TABLE IF NOT EXISTS podcasts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    episode TEXT,
    path TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```