export default function OrderNotification({ orderDetails }) {

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src='/order-icon.png'
                alt="new order"
                style={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                }}
            />
            <div className="flex flex-col gap-0.5 ml-3">
                <h1 className="text-[16px] font-bold">New order</h1>
            </div>
        </div>
    )
}