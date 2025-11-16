export default function OrderSuccess({ onNewOrder }){
    return (
        <div className="order-success">
            <h1>Thank you!</h1>
            <p>Your order has been submitted to Little Oven Baking Co.</p>
            <p>We'll be in touch soon to confirm the details.</p>

            <button type="button" onClick={onNewOrder}>
                Place Another Order
            </button>
        </div>
    )
}