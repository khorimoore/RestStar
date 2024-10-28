import React, { useState, useEffect, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomerOrderData } from '../interfaces/CustomerOrderData';

interface CustomerOrderProps {
    customerOrders: CustomerOrderData[] | null; // users can be an array of UserData objects or null
    totalPrice:number;
    onChangeQuantityHandler:(value:string,foodItemId:number,customerorderIndex:number)=>void;
    customerOrderListformHandler:(customerName:string)=>void
    
}

const CustomerList: React.FC<CustomerOrderProps> = ({ customerOrders , totalPrice,onChangeQuantityHandler,customerOrderListformHandler}) => {



    const [customerName, setCustomerName] = useState('');
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
                            <select onChange={(e)=>onChangeQuantityHandler(e.target.value,customerOrder.id,index)}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='0'>Delete</option>
                            </select>
                        </td>
                        <td>
                            {customerOrder.price}
                        </td>
                                        
                    </tr>
                ))}
                </tbody>
            </table>
            <form >

                <div className='col-12'>

                    <span ><i>CustomerName: </i></span>
                    <input className='' value={customerName}  name='customername' onChange={(e) => setCustomerName(e.target.value)}></input>
                </div>
                <div className='col-12'>
                <span>Total: {totalPrice}</span>
                </div>
                <div className='col-12'>
                    
                <button className='btn btn-success float-end m-2' onClick={(e)=>{e.preventDefault();customerOrderListformHandler(customerName)}}>order</button>
                </div>
            </form>
        </>
    );
};

export default CustomerList; 
