import { useState, useEffect, useLayoutEffect, } from "react";
// import { retrieveUsers } from "../api/userAPI";
// import type { UserData } from "../interfaces/UserData";
import type { CustomerOrderData } from "../interfaces/CustomerOrderData";
import ErrorPage from "./ErrorPage";
import MenuList from '../components/MenuList';
import CustomerOrders from '../components/CustomerOrders';
import auth from '../utils/auth';
import { addCustomerOrders } from "../api/customerOrderAPI";

const Home = () => {

    // const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);//error check
    const [loginCheck, setLoginCheck] = useState(false);//login check
    const [customerOrderList, setCustomerOrderList] = useState([] as CustomerOrderData[]);//customerOrderList
    const [totalPrice, setTotalPrice] = useState<number>(0);//total price
 

    useEffect(() => {
        if (loginCheck) {
            // fetchUsers();
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

    // const fetchUsers = async () => {
    //     try {
    //         const data = await retrieveUsers();
    //         setUsers(data);
    //     } catch (err) {
    //         console.error('Failed to retrieve users:', err);
    //         setError(true);
    //     }
    // }
    const addOrders = (id: number) => {
        // Find the food item by ID
        const foodItem = foodItems.filter(item => item.id === id);
        if (foodItem) { // If a food item is found
            // Update the customer order list
            setCustomerOrderList(prev=>[...prev, ...foodItem]);
            const sum = foodItem.reduce((accumulator, current) => accumulator + current.price, 0);
            setTotalPrice(prev=>prev+sum);
           
        }
    };

    const onChangeQuantityHandler= (value:string,foodItemid:number,customerorderIndex:number)=>{// function to handle Onchanging quantity change so it refelects price Accordingly
      
             customerOrderList.filter((item,index) => //filter the customerorderlist to refelect the price with its quantity
                {
                    const foodItem = foodItems.filter(item => item.id === foodItemid); // get the base price from 
                    if(item.id === foodItemid && customerorderIndex === index){
                        item.price = foodItem[0].price* parseInt(value); //set the price with the quantity multiplier
                        item.quantity = value;
                    }
                    return item;
                });
                const sum = customerOrderList.reduce((accumulator, current) => accumulator+current.price, 0);//calculate total price
                setTotalPrice(sum); //set Total Price

    }
    
    const customerOrderListformHandler = async (customerName:string)=>{
        
        try {
            // Call the customer API endpoint with customer order data
            const newCustomer = await addCustomerOrders(customerName,customerOrderList);
            alert('Customer In Queue Name:'+newCustomer.customerName+'('+newCustomer.id+')');
            window.location.assign('/customers');

          } catch (err) {
            console.error('Failed to login', err);  // Log any errors that occur during login
            setError(true);
          }
        
    }


    const foodItems = [
        { id: 1, name: "Burger", price: 5.99,quantity:'1' },
        { id: 2, name: "Pizza", price: 8.99 ,quantity:'1'},
        { id: 3, name: "Pasta", price: 7.49,quantity:'1' },
        { id: 4, name: "Salad", price: 4.99,quantity:'1' },
        { id: 5, name: "Fries", price: 2.99 ,quantity:'1'},
        { id: 6, name: "Sandwich", price: 6.49,quantity:'1' },
        { id: 7, name: "Soup", price: 3.99 ,quantity:'1'}
    ];

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>Login to take Orders!</h1>
                    </div>
                ) : (
                    
                        <div className="row">
                            <div className="col-3 shadow-lg text-break">
                                {/* <CustomerOrders customerOrders={[{id:1,name:'cofeee',price:10},{id:1,name:'cofeee',price:10},{id:1,name:'cofeee',price:10}]}/>      */}
                                <CustomerOrders customerOrders={customerOrderList} totalPrice={totalPrice} onChangeQuantityHandler={onChangeQuantityHandler} customerOrderListformHandler={customerOrderListformHandler}/>
                            </div>
                      
                           
                            <div className="col-8 m-5 shadow-lg">
                                <MenuList menuLists={foodItems} addOrders={addOrders}/>
                            </div>    
                        </div>
                 
                )}
        </>
    );
};

export default Home;
