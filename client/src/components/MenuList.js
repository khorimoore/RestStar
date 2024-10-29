import React from 'react';
const MenuList = ({ menuLists }) => {
    return (<>
            <h2 className="pb-5">
                Check out all your MenuList !
            </h2>
            <div className="row align-center mb-5 shadow-sm">
            {menuLists && menuLists.map((menuList) => (<div className="col-2 m-2" key={menuList.id}>
                        <button className='btn btn-info'>{menuList.id}. {menuList.name}</button>
                    </div>))}
            </div>
        </>);
};
export default MenuList;
