
import { useState, useEffect ,useLayoutEffect} from 'react';
import {CustomerListData} from '../interfaces/CustomerListData';
import Invoice from '../components/Invoice';
import {retrieveCustomers} from '../api/customerListAPI';
import CustomerList from '../components/CustomerList';
import auth from '../utils/auth';
import ErrorPage from './ErrorPage';
// import { CustomerOrderData } from '../interfaces/CustomerOrderData';


const Customers = () => {
    const [error, setError] = useState(false);//error check
    const [loginCheck, setLoginCheck] = useState(false);//login check
    const [customerList, setCustomerList] = useState([] as CustomerListData[]);//customerList
    const [invoice, setInvoice] = useState('');//customerList
  
 

    useEffect(() => {
        if (loginCheck) {
            fetchCustomers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };
    const fetchCustomers = async () => {  
            try {
                    const data = await  retrieveCustomers() ;
                    console.log(data);
                    setCustomerList(data);
                } catch (err) {
                    console.error('Failed to retrieve customers:', err);
                    setError(true);
                }
    }
    const getInvoice = (data:string)=>{

        console.log(data);

        setInvoice(data);

    }
    //  error page if error is set
    if (error) {
        return <ErrorPage />;
    }


    return (

        <div className="row">
            <div className="col-3 shadow-lg text-break">
                <CustomerList customerList={customerList} getInvoice={getInvoice}/>
            </div>

            {invoice ?
            <div className="col-8 m-5 shadow-lg">
                <Invoice invoice={invoice}/>
            </div>
            :''}
        </div>

    )
}
export default Customers;