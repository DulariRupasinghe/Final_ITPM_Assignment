import { useState } from 'react';

function FeedbackView() {
  const [lecturer, setLecturer] = useState('');
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await fetch(
      `http://localhost:5000/api/feedback/lecturer/${lecturer}`
    );
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>View Feedback</h2>

      <input placeholder="Lecturer Name"
        onChange={(e) => setLecturer(e.target.value)} />

      <button onClick={load}>Load</button>

      {data && (
        <div>
          <h3>Average Rating:</h3>
          <h2 style={{ color: "green" }}>
            {data.averageRating} / 5
          </h2>

          {data.feedbacks.map((f, i) => (
            <p key={i}>
              {"⭐".repeat(f.rating)} - {f.comment}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackView;
