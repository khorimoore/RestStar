import React, { useState, useEffect } from 'react';
import { CustomerOrderData } from '../interfaces/CustomerOrderData';

interface CustomerOrderProps {
  customerOrders: CustomerOrderData[] | null;
}

const CustomerList: React.FC<CustomerOrderProps> = () => {
  const [customerOrders, setCustomerOrders] = useState<CustomerOrderData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        setCustomerOrders(data); 
      } catch (err) {
        setError('Failed to fetch customer orders');
      } finally {
        setLoading(false);
      }
    };

export default CustomerList;