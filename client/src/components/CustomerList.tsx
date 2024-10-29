import React from 'react';

import type { CustomerListData } from "../interfaces/CustomerListData";
// import auth from '../utils/auth';

// Define the props for the component
interface CustomerListProps {

    customerLists: CustomerListData[] | null; // users can be an array of MenuData objects or null
    addOrders(id:number):void
}

const CustomerList: React.FC<CustomerListProps> = ({ customerLists,addOrders }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out the customer List !
            </h2>
            <div className="row align-center mb-5 shadow-sm" >
            {customerLists && customerLists.map((customerList) => (

                    <div className="col-2 m-2" key={customerList.id}>
                        <button className='btn btn-info' onClick={()=>addOrders(customerList.id)}>{customerList.id}. {customerList.name}</button>
                    </div>
            ))}
            </div>
        </>
    );
};

export default CustomerList;

