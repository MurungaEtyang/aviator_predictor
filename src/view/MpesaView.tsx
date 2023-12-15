import {tinyApi} from "../handleApi/mpesa";
import {useState} from "react";
import {ClipLoader} from "react-spinners";
import {PaymentRequestServiceImpl} from "../app/mpesa/service/PaymentRequestServiceImpl";
import {PaymentRequestService} from "../app/mpesa/service/PaymentRequestService";


const MpesaView = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const handlePayment = () =>{
        setLoading(true);

        tinyApi(phoneNumber, amount).then(() => {
            setPopupMessage("Payment successful!");
        });
        alert('');

        setLoading(false);
    }

    const handleRequest = () => {

        const paymentService: PaymentRequestService= new PaymentRequestServiceImpl();
        paymentService.requestPayment(Number(amount), phoneNumber, 200, "cdcbi5kqWqq").then(
            (response: boolean) => {
                if (response) {
                    alert("success!");
                }else alert("failed");
            }
        )

        alert("kwisha");
    }

    return (
        <div>
            <form>
                <input type={`text`}
                        placeholder={`enter your mpesa phone number`}
                       value={phoneNumber}
                       onChange={event =>{setPhoneNumber(event.target.value )}}
                />
                <input type={`text`}
                    placeholder={`Enter amount`}
                       value={amount}
                       onChange={event => {setAmount(event.target.value)}}
                />
                <button type="submit" className="login-button" disabled={loading}
                        onClick={handleRequest}>
                    {loading ? (
                        <ClipLoader color="#ffffff" loading={loading} size={30}/>
                    ) : (
                        'Pay Now'
                    )}
                </button>
            </form>

            {popupMessage && (
                <div className="popup">
                    <p>{popupMessage}</p>
                </div>
            )}
        </div>
    )
}

export default MpesaView