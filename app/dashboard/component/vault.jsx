/** @format */

import { useState, useEffect } from "react";
import Image from "next/image";
import Card from "../../../public/Group 3.svg";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import "./style.css";

export default function vault() {
  const [seeBalance, setSeeBalance] = useState(false);
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        const data = await api.get("/api/vault");
        setVaults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaults();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // if (vaults.length === 0) return <p>No vaults yet</p>;

  const seeMoney = () => {
    setSeeBalance((seeBalance) => !seeBalance);
  };
  return (
    <div className='card'>
      <div className='card_detail'>
        <div className='card_detail_addMoney'>
          <div className='cardDetail'>
            <p>Detail</p>
            <svg
              width='36'
              height='24'
              viewBox='0 0 36 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='1.54285'
                y='7.37146'
                width='32.4'
                height='14.9143'
                fill='white'
              />
              <line
                x1='0.600037'
                y1='6.40002'
                x2='35.4'
                y2='6.40002'
                stroke='white'
                strokeWidth='4'
              />
              <line
                x1='7'
                y1='16.2001'
                x2='14.6'
                y2='16.2001'
                stroke='#3C3C3C'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <line
                x1='28.2'
                y1='16.2001'
                x2='29'
                y2='16.2001'
                stroke='#3C3C3C'
                strokeWidth='6'
                strokeLinecap='round'
              />
              <rect
                x='2'
                y='2'
                width='32'
                height='20'
                rx='4'
                stroke='white'
                strokeWidth='4'
              />
            </svg>
          </div>
          <div
            className='cardDetail'
            onClick={() => router.push("?account=true&vault=true")}
          >
            <p>Add</p>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipzule='evenodd'
                d='M15.5777 12.7499H12.7497V15.5739C12.7497 15.9879 12.4137 16.3239 11.9997 16.3239C11.5857 16.3239 11.2497 15.9879 11.2497 15.5739V12.7499H8.4217C8.0077 12.7499 7.6717 12.4139 7.6717 11.9999C7.6717 11.5859 8.0077 11.2499 8.4217 11.2499H11.2497V8.42594C11.2497 8.01194 11.5857 7.67594 11.9997 7.67594C12.4137 7.67594 12.7497 8.01194 12.7497 8.42594V11.2499H15.5777C15.9917 11.2499 16.3277 11.5859 16.3277 11.9999C16.3277 12.4139 15.9917 12.7499 15.5777 12.7499ZM11.9997 1.76294C4.4407 1.76294 1.7627 4.44094 1.7627 11.9999C1.7627 19.5589 4.4407 22.2369 11.9997 22.2369C19.5577 22.2369 22.2367 19.5589 22.2367 11.9999C22.2367 4.44094 19.5577 1.76294 11.9997 1.76294Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
        <div className='balance'>
          <h1>Balance</h1>
          <p>
            {seeBalance
              ? "￡" + (vault.length === 0 ? "0.00" : vault.balance)
              : "-----"}
          </p>

          {seeBalance ? (
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={seeMoney}
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M19.6 7.3537L15.83 11.1237C15.88 11.3837 15.91 11.6437 15.91 11.9137C15.91 14.0737 14.15 15.8237 12 15.8237C11.73 15.8237 11.47 15.7937 11.21 15.7437H11.2L8.02002 18.9237C9.23002 19.4137 10.58 19.7137 12 19.7137C17.4 19.7137 21.75 15.4537 21.75 11.9137C21.75 10.3937 20.94 8.7437 19.6 7.3537Z'
                fill='white'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.09 11.9137C8.09 9.75371 9.84 8.00371 12 8.00371C12.76 8.00371 13.48 8.22371 14.08 8.61371L12.98 9.71371C12.68 9.57371 12.35 9.50371 12 9.50371C10.67 9.50371 9.59 10.5837 9.59 11.9137C9.59 12.2637 9.66 12.5937 9.8 12.8937L8.69 14.0037C8.31 13.4037 8.09 12.6837 8.09 11.9137ZM10.81 14.0137L14.1 10.7337L15.18 9.64371L18.48 6.35371L18.47 6.34371L20.17 4.64371C20.47 4.35371 20.47 3.87371 20.17 3.58371C19.88 3.29371 19.4 3.29371 19.11 3.58371L17.19 5.50371C15.69 4.65371 13.91 4.11371 12 4.11371C6.6 4.11371 2.25 8.38371 2.25 11.9137C2.25 13.7637 3.44 15.8137 5.35 17.3437L3.34 19.3537C3.04 19.6537 3.04 20.1237 3.34 20.4137C3.48 20.5637 3.68 20.6337 3.87 20.6337C4.06 20.6337 4.25 20.5637 4.4 20.4137L5.47 19.3537L6.6 18.2137H6.61L10.81 14.0137Z'
                fill='white'
              />
            </svg>
          ) : (
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={seeMoney}
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 9.58771C10.67 9.58771 9.58804 10.6697 9.58804 11.9997C9.58804 13.3297 10.67 14.4117 12 14.4117C13.33 14.4117 14.412 13.3297 14.412 11.9997C14.412 10.6697 13.33 9.58771 12 9.58771Z'
                fill='white'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 15.912C9.84305 15.912 8.08805 14.157 8.08805 12C8.08805 9.843 9.84305 8.088 12 8.088C14.157 8.088 15.912 9.843 15.912 12C15.912 14.157 14.157 15.912 12 15.912ZM12 4.198C6.59805 4.198 2.24805 8.466 2.24805 12C2.24805 15.534 6.59805 19.802 12 19.802C17.402 19.802 21.752 15.534 21.752 12C21.752 8.466 17.402 4.198 12 4.198Z'
                fill='white'
              />
            </svg>
          )}
        </div>
      </div>
      <div className='mainImage'>
        <Image src={Card} alt='card' width={400} height={400} />
      </div>
    </div>
  );
}
