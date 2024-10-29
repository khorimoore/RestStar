import React from 'react';

import type { CustomerListData } from "../interfaces/CustomerListData";
// import auth from '../utils/auth';

// Define the props for the component
interface MenuListProps {

    menuLists: CustomerListDataListData[] | null; // users can be an array of MenuData objects or null
    addOrders(id:number):void
}

const MenuList: React.FC<CustomerListProps> = ({ customerLists,addOrders }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out all the List !
            </h2>
            <div className="row align-center mb-5 shadow-sm" >
            {menuLists && menuLists.map((menuList) => (

                    <div className="col-2 m-2" key={menuList.id}>
                        <button className='btn btn-info' onClick={()=>addOrders(menuList.id)}>{menuList.id}. {menuList.name}</button>
                    </div>
            ))}
            </div>
        </>
    );
};

export default MenuList;

