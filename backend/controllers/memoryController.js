const Memory = require('../models/Memory');
const nlpService = require('../services/nlpService');

// 1. Add a new memory
const addMemory = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text input is required' });

    // Extract data using our advanced NLP service
    const extractedData = nlpService.extractMemoryData(text);

    // Check if we found the essential parts
    if (!extractedData.name || !extractedData.relation) {
      return res.status(400).json({ 
        error: 'Could not fully understand the sentence. Try something like: "Rahul is my son and we went to the park."' 
      });
    }

    // Save to MongoDB
    const memory = await Memory.create(extractedData);
    res.status(201).json({ success: true, data: memory });

  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// 2. Ask a question
const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    // Extract the name they are asking about
    const name = nlpService.extractNameFromQuestion(question);
    if (!name) return res.status(400).json({ error: "Could not identify a name. Try 'Who is [Name]?'" });

    // Search the database for that exact name
    const memory = await Memory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (!memory) {
      return res.status(404).json({ response: `I don't have any memories stored about ${name}.` });
    }

    // Format the response for the patient
    const responseText = `${memory.name} is your ${memory.relation}. You ${memory.event}.`;
    res.status(200).json({ success: true, response: responseText });

  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// 3. Get all memories
const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ success: true, count: memories.length, data: memories });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { addMemory, askQuestion, getMemories };