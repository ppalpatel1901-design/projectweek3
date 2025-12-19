const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory database
let users = [];
let idCounter = 1;

// ✅ GET – Fetch all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ✅ POST – Add user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newUser = { id: idCounter++, name, email };
  users.push(newUser);

  res.json({ message: "User added successfully", user: newUser });
});

// ✅ PUT – Update user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name;
  user.email = email;

  res.json({ message: "User updated successfully" });
});

// ✅ DELETE – Remove user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);

  res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
