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
        name: 'Pumpkin Chocolate Chip Cookie Cake',
        price: 25,
        image: cookieCakeImg,
    },
];

const [itemQuantities, setItemQuantities] = useState({});
const [bundleQty, setBundleQty] = useState(0);
const [timeSlot, setTimeSlot] = useState("");

const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
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
        timeSlot,
        items: items.map((item) => ({
            ...item,
            quantity: itemQuantities[item.id] || 0,
        })),
        bundle: {
            title: "Thanksgiving Bundle",
            price: 50,
            quantity: bundleQty,
            images: [appleCiderCakeImg, cookieCakeImg]
        },
    };


    if (onReview){
        onReview(payload);
    }
}
    const handleFulfillmentChange = (value) => {
        setFulfillment(value);
        setTimeSlot(""); // reset time selection
    };
const pickupSlots = [
  "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
  "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
  "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
  "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
  "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
  "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
  "4:00 PM",
];

const deliverySlots = [
  "4:30 PM", "4:45 PM",
  "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
  "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM",
  "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
  "8:00 PM",
];

const currentSlots = fulfillment === "pickup" ? pickupSlots : deliverySlots;

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
            <h2>Holiday Bundles</h2>
            <BundleRow 
            title="Thanksgiving Bundle"
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

            {fulfillment === "delivery" && (
                <>
                    <label htmlFor="cust-address">Delivey Address</label>
                    <input 
                    type="text"
                    id="cust-address"
                    value={customer.address}
                    onChange={(e) => handleCustomerChange("address", e.target.value)}
                    autoComplete="street-address"
                    required />
                </>
            )}
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
                    onChange={() => handleFulfillmentChange('pickup')} />
                    <span>Pickup</span>
                </label>
                <label>
                    <input 
                    type="radio"
                    name="fulfillment"
                    value="delivery"
                    checked={fulfillment === 'delivery'}
                    onChange={() => handleFulfillmentChange('delivery')}/>
                    <span>Delivery</span>
                </label>
            </div>
        </section>
        <section className="section">
            <h2>{fulfillment === "pickup" ? "Pickup Time" : "Delivery Time"}</h2>
            <label htmlFor="time-slot">
                <select 
                id="time-slot" 
                value={timeSlot} 
                onChange={(e) => setTimeSlot(e.target.value)}
                required>
                    <option value="">
                        -- Please choose a {fulfillment === "pickup" ? "pickup" : "delivery"} time --
                    </option>
                    {currentSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </label>
        </section>
        <button type="submit" className="submit-btn">
            Review Order
        </button>
    </form>
)
}