import easyinvoice, { InvoiceData } from 'easyinvoice';
import { useState, useEffect } from 'react';
import CustomerList from '../components/CustomerList';
import Invoice from '../components/Invoice';
import retrieveCustomers from '../api/customerListAPI';


const Customers = () => {
    const [error, setError] = useState(false);//error check
    const [loginCheck, setLoginCheck] = useState(false);//login check
    const [customerList, setCustomerList] = useState([] as CustomerData[]);//customerList
    const [totalPrice, setTotalPrice] = useState<number>(0);//total price
 

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
                    setCustomerList(data);
                } catch (err) {
                    console.error('Failed to retrieve customers:', err);
                    setError(true);
                }
    }


    return (

        <div className="row">
            <div className="col-3 shadow-lg text-break">
                <CustomerList customerList={customerList}/>
            </div>


            <div className="col-8 m-5 shadow-lg">
                <Invoice invoiceData={invoiceData}/>
            </div>
        </div>

    )
}
export default Customers;