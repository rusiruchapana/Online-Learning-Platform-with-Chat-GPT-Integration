import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendations } from '../../services/chatService';

const ChatRecommendation = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getRecommendations(prompt, user.token);
      setRecommendations(res.recommendations);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Course Recommendation Assistant</Card.Title>
        <Card.Text>
          Ask for course recommendations based on your goals (e.g., "I want to be
          a software engineer, what courses should I follow?")
        </Card.Text>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your learning goals..."
            />
          </Form.Group>
          <Button type="submit" disabled={loading}>
            {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </Button>
        </Form>
        {recommendations && (
          <div className="mt-4">
            <h5>Recommended Courses:</h5>
            <div className="p-3 bg-light rounded">
              {recommendations.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ChatRecommendation;