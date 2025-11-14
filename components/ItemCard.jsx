import { useState } from "react";

export default function ItemCard({
    id, name, price, onQuantityChange
})

{
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setQuantity(value);
    }

    if (onQuantityChange){
        onQuantityChange(id, value);
    }

    return (
    <div className="item-card">
        <div className="item-image">
            <img src="../assets/react.svg" alt="Apple Cider Cake" />
        </div>
        {/* Name and Price */}
        <h3>{name}</h3>
        <p>${price}</p>

        {/* Quantity Selector */}
        <label htmlFor="quantity">
            Quantity
            <input type="number" name="quantity" id="quantity" value={quantity} min={0} onChange={handleQuantityChange}/>
        </label>
    </div>
    );
}

