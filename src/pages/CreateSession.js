import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateSession() {
  const [moduleName, setModuleName] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/attendance/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleName, lecturerName, durationMinutes })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Save to localStorage as requested
        localStorage.setItem("lastSessionId", data.sessionId);
        alert("Session created successfully! Session ID: " + data.sessionId);
        // Optional: navigate to a page where QR is displayed, or Dashboard
        // navigate('/dashboard'); 
      } else {
        alert(data.message || "Failed to create session");
      }
    } catch (err) {
      alert("Error creating session");
    }
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      marginTop: "50px"
    }}>
      <h2>Create Attendance Session</h2>
      
      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Module Name (e.g. IT3010)" 
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <input 
          type="text" 
          placeholder="Lecturer Name" 
          value={lecturerName}
          onChange={(e) => setLecturerName(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <label style={{ textAlign: 'left', fontSize: '14px', color: '#555' }}>Duration (Minutes):</label>
        <input 
          type="number" 
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          required
          min="1"
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4caf50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          Generate Session
        </button>
      </form>
    </div>
  );
}

export default CreateSession;
