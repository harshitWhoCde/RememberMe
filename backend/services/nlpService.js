const nlp = require('compromise');

const relationKeywords = [
  'son', 'daughter', 'neighbor', 'friend', 'brother', 
  'sister', 'doctor', 'nurse', 'wife', 'husband', 'caretaker'
];

// NEW: Helper function to strip punctuation from names
const cleanName = (name) => {
  return name ? name.replace(/[^a-zA-Z]/g, '') : null;
};

const extractMemoryData = (text) => {
  const data = { name: null, relation: null, event: null };
  if (!text) return data;

  let doc = nlp(text);

  // 1. Extract Name and CLEAN it
  let people = doc.people().out('array');
  if (people.length > 0) {
    data.name = cleanName(people[0]); 
  } else {
    const nameMatch = text.match(/(?:i am|my name is|this is)\s+([a-zA-Z]+)/i);
    if (nameMatch) data.name = cleanName(nameMatch[1]);
  }

  // 2. Extract Relation
  let words = doc.terms().out('array');
  for (let word of words) {
    let cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (relationKeywords.includes(cleanWord)) {
      data.relation = cleanWord;
      break;
    }
  }

  // 3. Extract Event
  const eventMatch = text.match(/(?:we|and then i)\s+(.*)/i);
  if (eventMatch && eventMatch[1]) {
    data.event = eventMatch[1].trim();
  } else {
    data.event = text; 
  }

  return data;
};

const extractNameFromQuestion = (question) => {
  let doc = nlp(question);
  
  // Try to find the person's name natively and CLEAN it
  let people = doc.people().out('array');
  if (people.length > 0) {
    return cleanName(people[0]);
  }

  // Fallback regex and CLEAN it
  const match = question.match(/(?:who is|do you know)\s+([a-zA-Z]+)/i);
  return match ? cleanName(match[1]) : null;
};

module.exports = {
  extractMemoryData,
  extractNameFromQuestion,
};