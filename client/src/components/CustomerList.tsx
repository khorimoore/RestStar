import React from 'react';

import type { CustomerListData } from "../interfaces/CustomerListData";
// import auth from '../utils/auth';

// Define the props for the component
interface CustomerListProps {

    customerList: CustomerListData[] | null; // users can be an array of CustomerData objects or null
    getInvoice:(data:string)=>void;
  
}

const CustomerList: React.FC<CustomerListProps> = ({ customerList, getInvoice }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out the customer List !
            </h2>
            <div className="row align-center mb-5 shadow-sm" >
            {customerList && customerList.map((customerList) => (

                    <div className="col-12 m-2" key={customerList.id}>
                        <button className='btn btn-info' onClick={()=>getInvoice(customerList.orders[0].orderData)}>{customerList.id}. {customerList.customerName}</button>
                    </div>
            ))}
            </div>
        </>
    );
};

export default CustomerList;

