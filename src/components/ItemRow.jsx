import { useState } from "react";

export default function ItemRow({item, onQuanityChange}){
    const [qty, setQty] = useState(0);

    const handleChange = (e) => {
        const newQty = Number(e.target.value);
        setQty(newQty);
        onQuanityChange(item.id, newQty);
    }
    return(
        <div className="item-row">
            <img src={item.image} alt={item.name} className="item-img" />
            <div className="item-info">
                <h3>{item.name}</h3>
                <p className="price">${item.price.toFixed(2)}</p>
            </div>
            <div className="item-qty">
                <label htmlFor={`qty-${item.id}`}>Quantity</label>
                <input 
                type="number"
                id={`qty-${item.id}`}
                min="0"
                value={qty}
                onChange={handleChange} />
            </div>
        </div>
    )
}
