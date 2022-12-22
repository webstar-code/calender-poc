const RzpCheckout = () => {



  const onPay = () => {
    const LOCAL_URL = "http://localhost:5000"
    fetch(`${LOCAL_URL}/rzp-checkout`, {
      method: "POST",
      body: JSON.stringify({
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err))

    var options = {
      "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    // @ts-nocheck
    // var rzp1 = new Razorpay(options);
  }

  return (
    <div className="w-full h-full">
      <h1>Checkout</h1>





      <button onClick={() => onPay()}>Pay</button>
    </div>
  )
}


export default RzpCheckout