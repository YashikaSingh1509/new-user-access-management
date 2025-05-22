import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function ManagerDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/access/requests');
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    }
  };

  const handleDecision = async (requestId, status) => {
    try {
      await axios.post(`/access/requests/${requestId}/decision`, { status });
      fetchRequests(); // Refresh list after update
    } catch (err) {
      console.error('Failed to update request status', err);
    }
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <h3>Pending Software Access Requests</h3>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <strong>User:</strong> {req.username} | 
              <strong> Software:</strong> {req.softwareName} | 
              <strong> Status:</strong> {req.status}
              {req.status === 'pending' && (
                <>
                  <button onClick={() => handleDecision(req.id, 'approved')}>Approve</button>
                  <button onClick={() => handleDecision(req.id, 'rejected')}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
