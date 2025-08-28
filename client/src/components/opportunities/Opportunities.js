import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OpportunityItem from './OpportunityItem';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOpportunities = async () => {
      try {
        const res = await axios.get('/api/opportunities');
        setOpportunities(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getOpportunities();
  }, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Volunteer Opportunities</h1>
      <p className="lead">Browse and find opportunities</p>
      <div className="opportunities">
        {loading ? (
          <p>Loading...</p>
        ) : (
          opportunities.map(opportunity => (
            <OpportunityItem key={opportunity._id} opportunity={opportunity} />
          ))
        )}
      </div>
    </section>
  );
};

export default Opportunities;
