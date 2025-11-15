import { useState } from "react";
import '../BundleRow.css'

export default function BundleRow({title, image1, image2, price, onQuantityChange}){
    const [qty, setQty] = useState(0);

    const handleChange = (e) => {
        const newQty = Number(e.target.value);
        setQty(newQty);
        onQuantityChange(newQty);
    };

    return(
        <div className="bundle-row">
            <div className="bundle-images">
                <img src={image1} alt={`${title} item 1`} />
                <img src={image2} alt={`${title} item 2`} />
            </div>
            <div className="bundle-info">
                <h3>{title}</h3>
                <p className="bundle-price">
                    ${price.toFixed(2)}
                </p>
            </div>
            <div className="bundle-qty">
                <label>Qty</label>
                <input type="number"
                min="0"
                value={qty}
                onChange={handleChange} />
            </div>
        </div>
    )
}