// Placeholder for adding a new memory
const addMemory = async (req, res) => {
  res.status(200).json({ message: "Add memory endpoint working!" });
};

// Placeholder for asking a question
const askQuestion = async (req, res) => {
  res.status(200).json({ message: "Ask question endpoint working!" });
};

// Placeholder for getting all memories
const getMemories = async (req, res) => {
  res.status(200).json({ message: "Get memories endpoint working!" });
};

module.exports = {
  addMemory,
  askQuestion,
  getMemories
};