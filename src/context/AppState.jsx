import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';

const AppState = (props) => {

    // const url = "http://localhost:3000/api";

    const url = "https://mern-e-commerce-1-bgbu.onrender.com/api"

    const [products, setProducts] = useState([])
    const [token, setToken] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [user, setUser] = useState();
    const [cart, setCart] = useState([]);
    const [reload, setReload] = useState(false);
    const [userAddress , setUserAddress] = useState("");
    const [userOrder , setUserOrder] = useState([]);


    useEffect(() => {

        const fetchProducts = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            });
            // console.log(api.data.products);
            setProducts(api.data.products);
            setFilteredData(api.data.products);
            userProfile();
        }

        fetchProducts();
        userCart();
        getAddress();
        user_Order();
    }, [token, reload])

    useEffect(() => {
        let Istoken = localStorage.getItem("token");
        if (Istoken) {
            setToken(Istoken);
            setIsAuthenticated(true);
        }
    }, [])

    // User register
    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`, { name, email, password }, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        });
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        // alert(api.data.message);
        // console.log("User Register", api);
        return api.data;
    }

    // User Login
    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`, { email, password }, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        });
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setToken(api.data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", api.data.token);
        return api.data;
    }

    // User logout
    const logout = () => {
        setIsAuthenticated(false);
        setToken("");
        localStorage.removeItem("token");
        toast.success("Logout Successfully...!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    // User Profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true,
        })
        // console.log(api.data);
        // console.log(api)
        setUser(api.data.user);
    }

    // add to cart
    const addToCart = async (productId, title, price, qty, imgSrc) => {
        const api = await axios.post(
            `${url}/cart/add`,
            { productId, title, price, qty, imgSrc },
            {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth": token
                },
                withCredentials: true,
            }
        )
        setReload(!reload);
        // console.log("My Cart",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    // get user Cart
    const userCart = async () => {
        const api = await axios.get(`${url}/cart/user`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true
        });
        // console.log("user cart" , api);
        setCart(api.data.cart);
        // console.log(cart);
    }

    // decrease Cart
    const decreaseQty = async (productId, qty) => {
        const api = await axios.post(`${url}/cart/--qty`,
            { productId, qty },
            {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            })
        // console.log("decrease cart item",api)
        setReload(!reload);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    // remove product from cart
    const removeFromCart = async (productId) => {
        const api = await axios.delete(`${url}/cart/remove/${productId}`,
            {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            })
        console.log("Remove Product from cart", api)
        setReload(!reload);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    // clear cart
    const clearCart = async () => {
        const api = await axios.delete(`${url}/cart/clear`,
            {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            })
        // console.log("Cart Cleared", api)
        setReload(!reload);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }


    // add shipping address
    const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
        const api = await axios.post(`${url}/address/add`,
            {
                fullName, address, city, state, country, pincode, phoneNumber
            },
            {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth": token
                },
                withCredentials: true
            })
        console.log(api.data.message, api)
        setReload(!reload);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data;
    }


    // get user latest address
    const getAddress = async () => {
            const api = await axios.get(`${url}/address/get`, {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth":token
                },
                withCredentials: true
            });
            // console.log("User fetched Address" , api.data.userAddress);
            setUserAddress(api.data.userAddress);
        }

        // get user order
        const user_Order = async () => {
            const api = await axios.get(`${url}/payment/userorder`, {
                headers: {
                    "Content-Type": "Application/json",
                    "Auth":token
                },
                withCredentials: true
            });
            // console.log("User Order" , api.data);
            setUserOrder(api.data);
        }        

    return (
        <AppContext.Provider value={{
            
            products,
            register,
            login,
            token, 
            isAuthenticated,
            setIsAuthenticated,
            url,
            filteredData,
            setFilteredData,
            logout,
            user,
            addToCart,
            cart,
            decreaseQty,
            removeFromCart,
            clearCart,
            shippingAddress,
            userAddress,
            userOrder,

        }}>{props.children}</AppContext.Provider>
    )
}

export default AppState