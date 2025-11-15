export default function ReviewOrder({data, onEdit, onConfirm}){
    const {
        customer,
        fulfillment,
        items,
        bundle
    } = data;

    const lineItems = (items || [].filter((i) => i.quantity > 0));

    const bundleSubtotal = bundle && bundle.quantity > 0 ? bundle.price * bundle.quantity : 0;

    const itemsSubtotal = lineItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
    const total = itemsSubtotal + bundleSubtotal;

    return (
        <div className="order-review">
            <h1>Review Your Order</h1>
            {/* Items */}
            <section className="section">
                <h2>Items</h2>
                {lineItems.length === 0 && bundleSubtotal === 0 && (
                    <p>No items selected.</p>
                )}

                {lineItems.map((item) => (
                    <div key={item.id} className="review-row">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                {bundle && bundle.quantity > 0 && (
                    <div className="review-row">
                        <span>
                            {bundle.title} x {bundle.quantity}
                        </span>
                        <span>${bundleSubtotal.toFixed(2)}</span>
                    </div>
                )}
                {total > 0 && (
                    <div className="review-total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                )} 
            </section>
            <section className="section">
                <h2>Your Info</h2>
                <p>
                    <strong>Name: </strong> {customer.name}
                </p>
                <p>
                    <strong>Email: </strong> {customer.email}
                </p>
                <p>
                    <strong>Phone: </strong> {customer.phone}
                </p>
            </section>

            {/* Fulfillment */}
            <section className="section">
                <h2>Pickup / Delivery</h2>
                <p>{fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}</p>
            </section>

            {/* Action Buttons */}
            <div className="review-actions">
                <button type="button" onClick={onEdit}>
                    Edit Order
                </button>
                <button type="button" onClick={onConfirm}>
                    Confirm & Submit
                </button>
            </div>
        </div>
    )
}