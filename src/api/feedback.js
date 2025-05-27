import { demoFeedbackData, getPaginatedData } from '../demoData';

export const fetchProfileFeedbacks = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoFeedbackData, page, pageSize)), 500);
    });
  }
  
  const response = await fetch(`https://localhost:7029/api/Feedback/GetProfileFeedbacks?${profileId}&page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Не вдалося завантажити відгуки');
  return response.json();
};