// Connect to the badmintonWomenPlayers database
use badmintonWomenPlayers;

db.badmintonWomenPlayers.insertMany([
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
]);

// Find players ranked in the top 5
db.badmintonWomenPlayers.find({ ranking: { $lte: 5 } });

// Find players who have won more than 20 titles
db.badmintonWomenPlayers.find({ titlesWon: { $gt: 20 } });

// Retrieve players from India or China
db.badmintonWomenPlayers.find({ country: { $in: ["India", "China"] } });

// Find players aged under 30 and sort them by ranking
db.badmintonWomenPlayers.find({ age: { $lt: 30 } }).sort({ ranking: 1 });

// Count the number of players aged 25 or younger
db.badmintonWomenPlayers.countDocuments({ age: { $lte: 25 } });
