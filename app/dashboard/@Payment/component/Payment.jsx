/** @format */

"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function Payment() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setCheckEmail(!isEmail && value.length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!accountNumber || !sortCode || !firstName || !lastName || !amount) {
      setError("Please fill in all required fields");
      return;
    }

    if (checkEmail) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const fromAccount = localStorage.getItem("accountId");

      const data = await api.post("/api/transaction/transfer", {
        fromAccount: Number(fromAccount),
        toAccountNumber: accountNumber,
        toSortCode: sortCode,
        toName: `${firstName} ${lastName}`,
        amount: Number(amount),
        otp: otp || undefined, // Include OTP if required
      });

      if (data.requiresOtp) {
        // Show OTP input
        setShowOtp(true);
        setError(
          "An OTP has been sent to your email. Please enter it to confirm.",
        );
        return;
      }

      if (data.message === "Transfer successful") {
        setSuccess(`Transfer successful. Reference: ${data.reference}`);
        setAccountNumber("");
        setSortCode("");
        setFirstName("");
        setLastName("");
        setAmount("");
        setEmail("");
      } else {
        setError(data.message || "Transfer failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // Add this inside your form after the amount input
  {
    showOtp && (
      <div className='payment_form_input'>
        <label htmlFor='otp'>
          <p>Enter OTP</p>
        </label>
        <input
          type='text'
          id='otp'
          placeholder='Enter 5 digit OTP'
          maxLength={5}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className='payment_form'>
      {success && (
        <div className='payment_successMsg'>
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className='payment_errorMsg'>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='payment_form_container'>
          <div className='payment_input_column'>
            <div className='payment_form_input'>
              <label htmlFor='account_no_input'>
                <p>Account number</p>
              </label>
              <input
                type='text'
                name='accountNumber'
                id='account_no_input'
                placeholder='54##-####'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className='payment_form_input'>
              <label htmlFor='sort_code'>
                <p>Sort code</p>
              </label>
              <input
                type='text'
                name='sortCode'
                id='sort_code'
                placeholder='##-##-##'
                value={sortCode}
                onChange={(e) => setSortCode(e.target.value)}
              />
            </div>
          </div>

          <div className='payment_input_column'>
            <div className='payment_form_input'>
              <label htmlFor='first_name'>
                <p>First name</p>
              </label>
              <input
                type='text'
                name='firstName'
                id='first_name'
                placeholder='Jack'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='payment_form_input'>
              <label htmlFor='last_name'>
                <p>Last name</p>
              </label>
              <input
                type='text'
                name='lastName'
                id='last_name'
                placeholder='Stone'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className='payment_form_input'>
            <label htmlFor='amount'>
              <p>Amount £</p>
            </label>
            <input
              type='text'
              name='amount'
              id='amount'
              placeholder='0.00'
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(value)) setAmount(value);
              }}
            />
          </div>

          <div className='payment_form_input'>
            <div className='payment_optional'>
              <p>Optional</p>
            </div>
            {checkEmail && (
              <div className='payment_errorMsg'>
                <p>Please enter a correct email</p>
              </div>
            )}
            <label htmlFor='email'>
              <p>Email</p>
            </label>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='name@example.com'
              value={email}
              onInput={handleEmail}
              className={checkEmail ? "err" : ""}
            />
          </div>
        </div>

        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}

        <div className='payment_form_btus'>
          <button type='submit' disabled={loading}>
            <p>{loading ? "Sending..." : "Send"}</p>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.4895 5.79779C11.8428 5.53029 11.1212 5.31696 10.6778 5.76196C10.3078 6.13362 10.097 7.57279 10.0428 9.16612H3.18783C2.72699 9.16612 2.35449 9.53862 2.35449 9.99946C2.35449 10.4603 2.72699 10.8328 3.18783 10.8328H10.0437C10.0978 12.4228 10.3087 13.857 10.6787 14.227C10.8737 14.422 11.1212 14.4953 11.3903 14.4953C11.7678 14.4953 12.1862 14.3503 12.552 14.1986C13.8612 13.657 17.6453 11.3686 17.6453 9.99363C17.6453 8.57446 13.6895 6.29529 12.4895 5.79779Z'
                fill='white'
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
