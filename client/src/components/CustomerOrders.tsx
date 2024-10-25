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
            {customerOrders && customerOrders.map((customerOrder) => (
                <div className="row align-center mb-5 fw-0" key={customerOrder.id}>
                    <div className="col-md-6">
                        <h3>{customerOrder.id}. {customerOrder.name}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4><a href={`mailto:${customerOrder.price}`}>{customerOrder.price}</a></h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CustomerList;
