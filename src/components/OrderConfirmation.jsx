import React, { useContext , useEffect , useState } from 'react'
import AppContext from '../context/AppContext'
import ShowOrderProducts from './ShowOrderProducts';

const OrderConfirmation = () => {
    const { userOrder } = useContext(AppContext);
    const [latestOrder , setLatestOrder] = useState({});
    useEffect(()=>{
        if(userOrder){
            setLatestOrder(userOrder[0]);
        }
    },[userOrder]);
    // console.log("latest order" ,latestOrder)
    return (
        <>
            <div className="container my-3">
                <h1 className="text-center">Your order has been confirm</h1>
                <h3 className='text-center'>It will delivered soon</h3>
            </div>

            <div className="container">

                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col" className='bg-dark text-light'>Order Items</th>
                            <th scope="col" className='bg-dark text-light'>Order Details & Shipping Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row" className='bg-dark text-light'>
                                {/* <TableProduct cart={cart} /> */}
                                <ShowOrderProducts items={latestOrder?.orderItems} />
                            </td>
                            <td className='bg-dark text-light'>
                                <ul style={{ fontWeight: 'bold' }}>
                                    <li>Order Id:{latestOrder?.orderId}</li>
                                    <li>PaymentId:{latestOrder?.paymentId}</li>
                                    <li>Payment Status:{latestOrder?.payStatus}</li>
                                    <li>OrderDate:{latestOrder?.orderDate}</li>
                                    <li>Name:{latestOrder?.userShipping?.fullName}</li>
                                    <li>Phone:{latestOrder?.userShipping?.phoneNumber}</li>
                                    <li>State:{latestOrder?.userShipping?.state}</li>
                                    <li>City:{latestOrder?.userShipping?.city}</li>
                                    <li>PinCode{latestOrder?.userShipping?.pincode}</li>
                                    <li>Near By:{latestOrder?.userShipping?.address}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderConfirmation