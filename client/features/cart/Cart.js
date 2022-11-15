import React from "react"
import {
  fetchOrdersAsync,
  addProductToOrderAsync,
  fetchOrderAndProductsAsync,
} from "../../slices/ordersSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Cart = () => {
  const orders = useSelector((state) => state.orders.allOrders)
  const orderProducts = useSelector((state) => state.orders.orderProducts)

  const DEFAULT_ORDER_ID = 1
  // state controllers
  const [deleteProdId, setDeleteProdId] = useState(0)
  const [orderIdState, setOrderId] = useState(DEFAULT_ORDER_ID)

  const dispatch = useDispatch()

  // THIS IS TEMPORARY
  let userOrderId = { orderId: orderIdState }

  useEffect(() => {
    dispatch(fetchOrderAndProductsAsync(userOrderId))
  }, [])

  console.log(orderProducts)

  async function handleRemove(event) {
    event.preventDefault()
    console.log("clicked the remove from cart button")

    // ! dispatch delete product from orderID thunk below
    // ! probably need to send both orderId and ProdId
    // dispatch()
  }

  const subTotal = orderProducts.reduce((sumTotal, curElement) => {
    return (sumTotal += curElement.price)
  }, 0)
  const roundedSubtotal = subTotal.toFixed(2)
  const shippingTotal = roundedSubtotal / 10
  const roundedShippingTotal = shippingTotal.toFixed(2)
  const grandTotal = subTotal + shippingTotal
  const roundedGrandTotal = grandTotal.toFixed(2)

  return (
    <div className="cart_full_body_container">
      <div className="cart_body_container">
        <div className="cart_body_items_container">
          <div className="cart_items_heading">
            My Order: {orderProducts.length} items
          </div>
          <div className="cart_items_all_container">
            {orderProducts.map((singleProduct) => {
              return (
                <div className="cart_single_item" key={singleProduct.id}>
                  <img
                    width="150px"
                    height="150px"
                    className="cart_item_img"
                    src={singleProduct.imageUrl}
                  />
                  <div className="cart_item_description">
                    <h3>{singleProduct.title}</h3>
                    <p>{singleProduct.description}</p>
                    <p>${singleProduct.price}</p>
                    <br></br>
                    <br></br>

                    <form onSubmit={handleRemove}>
                      <button
                        type="submit"
                        className="cart_remove_item_button"
                        onClick={() => {
                          setDeleteProdId(singleProduct.id)
                        }}
                      >
                        Remove from cart
                      </button>
                    </form>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="cart_body_payment_container">
        <h3 className="cart_payment_heading">TOTAL</h3>
        <div className="cart_payment_costs_container">
          <ul className="cart_payment_costs_labels">
            <li>Subtotal</li>
            <li>Shipping</li>
            <li>Grand Total</li>
          </ul>
          <ul className="cart_payment_costs_values">
            <li>${roundedSubtotal}</li>
            <li>${roundedShippingTotal}</li>
            <li>${roundedGrandTotal}</li>
          </ul>
        </div>
        <button className="cart_payment_checkout_btn">CHECKOUT</button>
      </div>
    </div>
  )
}

export default Cart
