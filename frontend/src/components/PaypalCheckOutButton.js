// import React from 'react'
// import ReactDOM from 'react-dom'
// import paypal from 'paypal-checkout'

// const PayPalCheckOutButton = ({order}) => {
//     const paypalConf ={
//         currency: 'USD',
//         env: 'sandbox',
//         client: {
//             sandbox:"ASmh7ARZ-3oamcpSZaPIkhVS30Sn44DzOSQDUiVPrSoT4piOoAYbRM_pJKPRl4fc0fLjcpP6eV1UGXPd"
            
//     },
//     style: {
//         label: 'pay',
//         size: 'large',
//         shape: 'rect',
//         color: 'gold'

//     }
// };
// const PaypalButton = paypal.Button.driver('react', { React, ReactDOM })
// const payment = (data, actions) => {
//     const payment = {
//         transactions: [
//             {
//                 amount: {
//                     total: order.total,
//                     currency: paypalConf.currency
//             },
//             description: 'Payment for your order',
//             custom: order.customer || "",
//             item_list: {
//                 items: order.items
//             } 
//         }
//         ],
//         note_to_payer: 'Contact us for any questions on your order',
//     };
//     return actions.payment.create({payment});
// };
// const onAuthorize = (data, actions) => {
//     return actions.payment.execute()
//     .then((response) => {
//         console.log(response);
//         alert(`Payment Successful, Thank you for your order, ID: ${response.id}`);
//     })
//     .catch((err) => {
//     console.log(err);
//     alert(`Payment Failed, ID: ${err.id}`);
//     });
// };
//  const onError = (err) => {
//     console.log(err);
//     alert(`Payment Failed, ID: ${err.id}`);

// };
// const onCancel = (data, actions) => {
//     alert(`Payment Canceled, ID: ${data.id}`);
// }
// return (
//     <PaypalButton
//         env={paypalConf.env} 
//         client={paypalConf.client} 
//         payment={(data, actions) => payment(data, actions)}
//         onAuthorize={(data, actions) => onAuthorize(data, actions)}
//         onCancel={(data, actions) => onCancel(data, actions)}
//         onError={(err) => onError(err)}
//         style={paypalConf.style}
//         commit
//         locale="en_US"
//     />
      
// )
// }

// export default PayPalCheckOutButton;