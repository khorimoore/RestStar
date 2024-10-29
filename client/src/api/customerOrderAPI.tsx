import { CustomerOrderData } from '../interfaces/CustomerOrderData';
import Auth from '../utils/auth';

const retrieveCustomerOrders = async () => {
  try {
    const response = await fetch('/api/customers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}
const addCustomerOrders = async (customerName:string,customerOrderInfo: CustomerOrderData[]) => {
    try {
      const response = await fetch('/api/customers', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({'customerName':customerName,'orderData':customerOrderInfo})
      });
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('Invalid user API response, check network tab!');
      }
  
      return data;
  
    } catch (err) { 
      console.log('Error from data retrieval:', err);
      return [];
    }
  }

export { retrieveCustomerOrders ,addCustomerOrders};