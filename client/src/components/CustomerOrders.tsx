import React from 'react';

import type { CustomerOrderData } from "../interfaces/CustomerOrderData";
import auth from '../utils/auth';

// Define the props for the component
interface CustomerOrderProps {
    customerOrders: CustomerOrderData[] | null; // users can be an array of UserData objects or null
}

const CustomerList: React.FC<CustomerOrderProps> = ({ customerOrders }) => {
    return (
        <>
            <h2 className="pb-5">
                 Customer Orders list !
            </h2>
            <div className="row align-center mb-5 fw-0" >
            {customerOrders && customerOrders.map((customerOrder,index) => (
                <div className="col-md-12" key={customerOrder.id}>
                    <h3>{index}. {customerOrder.name} {customerOrder.price}</h3>
               
                </div>
  
                    
            ))}
            </div>
        </>
    );
};

export default CustomerList;
