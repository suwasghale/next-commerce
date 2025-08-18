export const saveCartToLocalStorage = (cartState:unknown) =>{
    try{
        const serializedData = JSON.stringify(cartState)
        localStorage.setItem('cart', serializedData)

    }
    catch(err){
        console.error('Error on saving cart to localStorage.', err)
    }
}


export const loadCartFromLocalStorage = () =>{
    try{
        const serializedData = localStorage.getItem('cart')
        if (!serializedData) return undefined;
        return JSON.parse(serializedData)

    }
    catch(err){
        console.error("Error on loading cart from localStorage", err)
        return undefined;
    }
}