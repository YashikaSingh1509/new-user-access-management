import axios from '../api/axios';
import { useEffect, useState } from 'react';

export default function EmployeeDashboard() {
  const [softwareList, setSoftwareList] = useState([]);

  useEffect(() => {
    axios.get('/software').then(res => setSoftwareList(res.data));
  }, []);

  const requestAccess = (softwareId) => {
    axios.post(`/access/request`, { softwareId });
  };

  return (
    <div>
      <h2>Available Software</h2>
      {softwareList.map(s => (
        <div key={s.id}>
          {s.name} <button onClick={() => requestAccess(s.id)}>Request Access</button>
        </div>
      ))}
    </div>
  );
}
