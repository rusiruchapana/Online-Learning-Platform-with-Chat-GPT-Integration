const axios = require('axios');

// @desc    Get course recommendations from ChatGPT
// @route   POST /api/chat/recommend
// @access  Private/Student
const getRecommendations = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful course recommendation assistant for an online learning platform. Based on user input, suggest relevant courses from our catalog. Our courses include: Web Development, Data Science, Machine Learning, Python Programming, JavaScript Fundamentals, React.js, Node.js, Database Design, UI/UX Design, Mobile App Development, Cybersecurity, Cloud Computing. Format your response with course titles and brief descriptions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
        },
      }
    );

    const recommendations = response.data.choices[0].message.content;
    res.json({ recommendations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getRecommendations };