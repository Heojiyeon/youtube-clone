import express from 'express';

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.send("Im home!");
}

const handleLogin = (req, res) => {
    return res.send("Login here!");
}

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);