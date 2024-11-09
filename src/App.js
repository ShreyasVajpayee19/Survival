import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('/submission.csv');
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            setPassengers(results.data);
            setLoading(false);
          },
        });
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Titanic Survival Predictions</h1>
      <table>
        <thead>
          <tr>
            <th>PassengerId</th>
            <th>Survived</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index}>
              <td>{passenger.PassengerId}</td>
              <td>{passenger.Survived === '1' ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
