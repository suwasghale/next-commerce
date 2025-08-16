'use client'

import { createContext, useContext, useState, useEffect } from "react"

// CartItem: each product in the cart
interface CartItem{
    id:number,
    title:string,
    price:number,
    image:string,
    quantity:number,
}

interface CartContextType{
    cart:CartItem[], // cart state array of CartItem
    addToCart:(item:CartItem)=>void, // add or increase quantity of item in cart
    removeFromCart:(id:number)=>void, // remove item from cart
    clearCart:()=>void, // clear/empty the cart
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children} : {children: React.ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]> ([])

    // load cart from localStorage on initial render/ on mount.
    useEffect(()=>{
        const storedCart = localStorage.getItem('cart')
        if (storedCart){
            setCart(JSON.parse(storedCart))
        }
    },[])

    // save cart to localStorage whenever it changes
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // add item to cart
    const addToCart=(item:CartItem)=>{
        setCart((prev)=>{
            const existingItem = prev.find((i)=> i.id === item.id);
            if (existingItem){
                // if item already exists, increase the quantity
                return prev.map((i)=>
                i.id === item.id ? {...i, quantity: i.quantity + item.quantity}: i
            )}
            // if item does not exist of if new item, add it to the cart
            return [...prev, item]
        });
    }

    // remove item from cart
    const removeFromCart = (id:number)=>{
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    // clear/empty the cart
    const clearCart = () => {
        setCart([]);
    }   
}


export const useCart = () =>{
    const context = useContext(CartContext);
    if (!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}