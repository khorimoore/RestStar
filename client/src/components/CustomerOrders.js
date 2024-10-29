import React, { useState, useEffect } from 'react';
const CustomerList = () => {
    const [customerOrders, setCustomerOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomerOrders(data);
            }
            catch (err) {
                setError('Failed to fetch customer orders');
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    if (loading)
        return <div>Loading...</div>;
    if (error)
        return <div>{error}</div>;
    return (<div>
      <h2 className="pb-5">Customer Orders List</h2>
      {customerOrders && customerOrders.map((order) => (<div className="row align-items-center" key={order.id}>
          <div className="col-md-6">
            <h3>{order.name}</h3>
          </div>
          <div className="col-md-6">
            <h4><a href={`mailto:${order.price}`}>{order.price}</a></h4>
          </div>
        </div>))}
    </div>);
};
export default CustomerList;
