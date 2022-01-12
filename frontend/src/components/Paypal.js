import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; //Importamos el npm
import {useStateValue} from '../../mainReducer';
import {getTotal} from '../../reducer';

export default function PayPal() {
    const [{basket},dispatch] = useStateValue(); //traemos la info de nuestro carrito de compra
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    console.log(1, orderID);
    console.log(2, success);
    console.log(3, ErrorMessage);  
    
    useEffect(() => {

        PayPalCheckOut()//LLamo al cdn de PayPal cada vez que cambia el carrito

    }, [basket]);

    const initialOptions = { // Genero las opciones para enviarle al CDN
        "client-id": "AUzLXvUHDcNu5B7vgEvIt8Ag27Lz8ZDQlWfqKs6EgzhpZnYZL2Qb0Orw0hKCTkdFNKJHQ_x-RwQaOdaq",
        currency: "USD", //Establesco la moneda
        intent: "capture", //Estableco el metodos este autoriza la operacion y captura los fondos
        
    };
    let productsId=basket.map(items=>items.id)
    console.log(productsId)
  const createOrder = (data, actions) => {
       //Creo la orden de con los datos, esta puede ser general o con detalle de items
      console.log(data)
    return actions.order.create({
             purchase_units: [
       {
          description:"items",
          amount: {
            value: getTotal(basket),
          },
    
        },
     
       
      ],

    });
  };
  const onApprove = (data, actions) => { //recibo el resultado de mi operacion
      console.log(data)
    return actions.order.capture()
    .then(function (details) {
        const { payer } = details;
        setSuccess(true);
        console.log('Capture result', details, JSON.stringify(details, null, 2)); //veo los datos en consola
                var transaction = details.purchase_units[0].payments.captures[0];
                alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
        console.log(details)
        setOrderID(transaction.id)
    });  
  };
  const onCancel = (data) => {
    console.log('You have cancelled the payment!', data);
}	        

  const onError = (data, actions) => { //Capturo error en caso de que exista
    setErrorMessage("An Error occured with your payment ");
  };

  const PayPalCheckOut = ()=>{
    return (
        <PayPalScriptProvider options={initialOptions}> {/*Inicializo el CDN*/}

                {/*Inicializo los botones*/}
                <PayPalButtons 
                    createOrder={createOrder}
                    onApprove={ onApprove}
                    onError={onError}
                    onCancel={onCancel}
                />
        </PayPalScriptProvider>
    )
}
  return (
<PayPalCheckOut/> 
  );
}