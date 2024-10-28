import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomerOrderData } from '../interfaces/CustomerOrderData';

interface CustomerOrderProps {
    customerOrders: CustomerOrderData[] | null; // users can be an array of UserData objects or null
}

const CustomerList: React.FC<CustomerOrderProps> = ({ customerOrders }) => {
    return (
        <>
            <h2 className="pb-5">
                 Customer Orders list !
            </h2>
            <table className="table table-success table-striped ">
                <thead>
                <tr className="table-active">
                    <td>
                        OrderId 
                    </td>
                    <td>
                       Name
                    </td>
                    <td>
                        Quantity
                    </td>
                    <td>
                        Price
                    </td>
                </tr>
                </thead>
                <tbody>
                    
   
  
                {customerOrders && customerOrders.map((customerOrder,index) => (
                    <tr className="table-active">
                        <td>
                           {index+1}
                        </td>
                        <td>
                            {customerOrder.name}
                        </td>
                        <td>
                            <select onChange={(e)=>alert(e.target.value)}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </td>
                        <td>
                            {customerOrder.price}
                        </td>
                                        
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='col-12'>

                <span ><i>CustomerName: </i></span>
                <input className='form'  name='customername'></input>
            </div>
            <div className='col-12'>
                
              <button className='btn btn-success float-end m-2'>order</button>
            </div>
        </>
    );
};

export default CustomerList; 
