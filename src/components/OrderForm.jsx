import { useState } from "react";
import ItemRow from "./ItemRow";
import BundleRow from "./BundleRow";

import appleCiderCakeImg from '../assets/applecidercake.jpeg';
import cookieCakeImg from '../assets/cookiecake.jpeg';


export default function OrderForm({ onReview }){
// Inventory

const items = [
    {
        id: "apple-cider-cake",
        name: 'Apple Cider Cake',
        price: 30,
        image: appleCiderCakeImg,
    },
    {
        id: 'cookie-cake',
        name: 'Pumpkin Frosting Cookie Cake',
        price: 25,
        image: cookieCakeImg,
    },
];

const [itemQuantities, setItemQuantities] = useState({});
const [bundleQty, setBundleQty] = useState(0);

const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
});

const [fulfillment, setFulfillment] = useState('pickup');

// Handlers

const handleItemQuantityChange = (id, qty) => {
    setItemQuantities((prev) => ({
        ...prev,
        [id]: qty,
    }));
};
const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({
        ...prev,
        [field]: value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
        customer,
        fulfillment,
        items: items.map((item) => ({
            ...item,
            quantity: itemQuantities[item.id] || 0,
        })),
        bundle: {
            title: "Holiday Bundle",
            price: 50,
            quantity: bundleQty,
            images: [appleCiderCakeImg, cookieCakeImg]
        },
    };

    if (onReview){
        onReview(payload);
    }
}
return(
    <form action="" className="order-form" onSubmit={handleSubmit}>
        <h1>Little Oven Holiday Order</h1>
        {/* Items */}
        <section className="section">
            <h2>Individual Items</h2>
            {items.map((item) => (
                <ItemRow
                key={item.id}
                item={item}
                onQuanityChange={handleItemQuantityChange}
                />
            ))}
        </section>
        {/* Bundle */}
        <section className="section">
            <h2>Holiday Bundle</h2>
            <BundleRow 
            title="Holiday Bundle"
            image1={appleCiderCakeImg}
            image2={cookieCakeImg}
            price={50}
            onQuantityChange={setBundleQty}
            />
        </section>
        <section className="section">
            <h2>Your Info</h2>

            <label htmlFor="cust-name">Name</label>
            <input 
            type="text"
            id="cust-name"
            value={customer.name}
            onChange={(e) => handleCustomerChange("name", e.target.value)}
            required />

            <label htmlFor="cust-email">Email</label>
            <input 
            type="text"
            id="cust-email"
            value={customer.email}
            onChange={(e) => handleCustomerChange("email", e.target.value)}
            required />

            <label htmlFor="cust-phone">Phone</label>
            <input 
            type="tel"
            id="cust-phone"
            value={customer.phone}
            onChange={(e) => handleCustomerChange("phone", e.target.value)}
            required />
        </section>

        <section className="section">
            <h2>Pickup or Delivery?</h2>
            <div>
                <label>
                    <input 
                    type="radio"
                    name="fulfillment"
                    value="pickup"
                    checked={fulfillment === 'pickup'}
                    onChange={() => setFulfillment('pickup')} />
                    <span>Pickup</span>
                </label>
                <label>
                    <input 
                    type="radio"
                    name="fulfillment"
                    value="delivery"
                    checked={fulfillment === 'delivery'}
                    onChange={() => setFulfillment('delivery')}/>
                    <span>Delivery</span>
                </label>
            </div>
        </section>
        <button type="submit" className="submit-btn">
            Review Order
        </button>
    </form>
)
}