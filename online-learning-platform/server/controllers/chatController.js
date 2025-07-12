const axios = require('axios');
require('dotenv').config();

// Track API request count
let requestCount = 0;
const MAX_REQUESTS = process.env.CHATGPT_MAX_REQUESTS || 250;

const getRecommendations = async (req, res) => {
  const { prompt } = req.body;

  if (requestCount >= MAX_REQUESTS) {
    return res.status(429).json({ 
      error: 'API request limit reached',
      message: `Maximum of ${MAX_REQUESTS} API requests have been made.`
    });
  }

  try {
    requestCount++;
    console.log(`Making GPT API request #${requestCount}`);

    const response = await axios.post(
      process.env.CHATGPT_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.CHATGPT_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: process.env.CHATGPT_SYSTEM_PROMPT || 'You are a helpful course recommendation assistant...'
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: parseFloat(process.env.CHATGPT_TEMPERATURE) || 0.7,
        max_tokens: parseInt(process.env.CHATGPT_MAX_TOKENS) || 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
        },
        timeout: parseInt(process.env.CHATGPT_TIMEOUT_MS) || 10000
      }
    );

    return res.json({ 
      recommendations: response.data.choices[0].message.content,
      requestsRemaining: MAX_REQUESTS - requestCount
    });
    
  } catch (err) {
    console.error('GPT API Error:', err.message);
    
    if (err.response) {
      return res.status(err.response.status).json({
        error: 'GPT API Error',
        message: err.response.data.error?.message || 'Unknown API error'
      });
    }
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
};

const getUsageStats = async (req, res) => {
  res.json({
    requestsMade: requestCount,
    requestsRemaining: MAX_REQUESTS - requestCount,
    requestLimit: MAX_REQUESTS
  });
};

module.exports = { 
  getRecommendations,
  getUsageStats
};