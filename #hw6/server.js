const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let players = [
  { playerId: 1, name: "P. V. Sindhu", ranking: 7, country: "India", age: 28, titlesWon: 15 },
  { playerId: 2, name: "Carolina Marin", ranking: 5, country: "Spain", age: 30, titlesWon: 22 },
  { playerId: 3, name: "Tai Tzu-ying", ranking: 2, country: "Taiwan", age: 29, titlesWon: 30 },
  { playerId: 4, name: "Akane Yamaguchi", ranking: 1, country: "Japan", age: 26, titlesWon: 20 },
  { playerId: 5, name: "Ratchanok Intanon", ranking: 6, country: "Thailand", age: 29, titlesWon: 18 },
  { playerId: 6, name: "Chen Yufei", ranking: 3, country: "China", age: 25, titlesWon: 17 },
  { playerId: 7, name: "Nozomi Okuhara", ranking: 8, country: "Japan", age: 29, titlesWon: 12 },
  { playerId: 8, name: "Saina Nehwal", ranking: 10, country: "India", age: 33, titlesWon: 24 },
  { playerId: 9, name: "An Se-young", ranking: 4, country: "South Korea", age: 22, titlesWon: 19 },
  { playerId: 10, name: "He Bingjiao", ranking: 9, country: "China", age: 27, titlesWon: 10 }
];

// GET all players
app.get('/players', (req, res) => {
    res.json(players);
});

// POST a new player
app.post('/players', (req, res) => {
    const newPlayer = req.body;
    players.push(newPlayer);
    res.status(201).json(newPlayer);
});

// PATCH (Update a player's data)
app.patch('/players/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    let player = players.find(p => p.playerId == id);
    if (player) {
        Object.assign(player, updates);
        res.json(player);
    } else {
        res.status(404).json({ message: "Player not found" });
    }
});

// DELETE a player
app.delete('/players/:id', (req, res) => {
    const { id } = req.params;
    players = players.filter(p => p.playerId != id);
    res.json({ message: "Player deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
