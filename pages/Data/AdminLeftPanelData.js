import React from 'react';

import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { MdFoodBank } from "react-icons/md";
import { BiCoffee } from "react-icons/bi";
import { BiDrink } from "react-icons/bi";
import { GiManualJuicer } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { BiDetail } from "react-icons/bi";



const LeftPanelData=[
// dashboard
{
id:1,
title:"Dashboard",
path:"/admin",
icon: <MdOutlineDashboard />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"Home Dashboard",
path:"/admin",
}
]
}
,


// food 
{
id:2,
title:"Foods",
path:"/admin/AddFood",
icon: <MdFoodBank />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"Add Food",
path:"/admin/AddFoodItem",
},
{
title:"Update Food",
path:"/admin/UpdateFoodItem",
},
{
title:"Delete Food",
path:"/admin/AddFood",
},
{
title:"View Food",
path:"/admin/ShowFoodItem",
},
{
title:"Manage Food Categories",
path:"/admin/AllFoodCategories",
},
]
},


// coffee
{
id:3,
title:"Coffees",
path:"/admin/AddFood",
icon: <BiCoffee />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"Add Coffee",
path:"/admin/AddCoffee",
},
{
title:"Update Coffee",
path:"/admin/AddCoffee",
},
{
title:"Delete Coffee",
path:"/admin/AddCoffee",
},
{
title:"View Coffee",
path:"/admin/AddCoffee",
},
{
title:"Manage Coffee Categories",
path:"/admin/AllCoffeeCategory",
},
]
},

// drinks
{
id:4,
title:"Drinks",
path:"/admin/AddFood",
icon: <BiDrink />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"Add Drinks",
path:"/admin/AddDrinks",
},
{
title:"Update Drinks",
path:"/admin/AddDrinks",
},
{
title:"Delete Drinks",
path:"/admin/AddDrinks",
},
{
title:"View Drinks",
path:"/admin/AddDrinks",
},
{
title:"Manage Drinks Categories",
path:"/admin/AllDrinkCategory",
},
]
},


// Jucies
{
id:5,
title:"Juices",
path:"/admin/AddFood",
icon: <GiManualJuicer />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"Add Juices",
path:"/admin/AddJuices",
},
{
title:"Update Juices",
path:"/admin/AddJuices",
},
{
title:"Delete Juices",
path:"/admin/AddJuices",
},
{
title:"View Juices",
path:"/admin/AddJuices",
},
{
title:"Manage Juices Categories",
path:"/admin/AllJuiceCategory",
},
]
},

// orders
{
id:6,
title:"Orders",
path:"/admin/AddFood",
icon: <BiDetail />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"Realtime Order",
path:"/admin/AddOrder",
},
{
title:"Pending Order",
path:"/admin/AddOrder",
},
{
title:"Past Order",
path:"/admin/AddOrder",
},
]
},


// payment
{
id:7,
title:"Payments",
path:"/admin/AddFood",
icon: <MdPayment />,
open: <IoIosArrowForward />,
close: <IoIosArrowDown />,
subMenu:[
{
title:"This Month Collection",
path:"/admin/AddOrder",
},
{
title:"Past Transction",
path:"/admin/AddOrder",
},
]
},


// logout
{
id:8,
title:"Logout",
path:"/admin/AddFood",
icon: <BiLogOut />,
},

]

export default LeftPanelData;