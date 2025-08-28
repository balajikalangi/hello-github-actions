import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyOpportunities = async () => {
      try {
        // TODO: This endpoint doesn't exist yet. It should fetch opportunities for the logged-in NGO.
        // For now, I'll fetch all opportunities and filter them on the client-side.
        // This is inefficient and should be replaced with a dedicated API endpoint.
        const res = await axios.get('/api/opportunities');

        // TODO: Replace with actual user ID from auth state
        const myId = '612f7b6b906a6224d8f8b8a5'; // Placeholder NGO ID

        const myOpportunities = res.data.filter(opp => opp.ngo._id === myId);
        setOpportunities(myOpportunities);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getMyOpportunities();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await axios.delete(`/api/opportunities/${id}`);
        setOpportunities(opportunities.filter(opp => opp._id !== id));
        alert('Opportunity deleted successfully.');
      } catch (err) {
        console.error(err);
        alert('Error deleting opportunity.');
      }
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        Welcome NGO Name {/* TODO: Replace with actual user name */}
      </p>
      {/* TODO: Add actions (e.g., create opportunity) */}
      <h2 className="my-2">My Opportunities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="hide-sm">Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {opportunities.map(opp => (
              <tr key={opp._id}>
                <td>{opp.title}</td>
                <td className="hide-sm">{new Date(opp.date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/opportunities/edit/${opp._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(opp._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Dashboard;
