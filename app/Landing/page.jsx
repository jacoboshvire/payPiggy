/** @format */

"use client";
import { motion, scale } from "framer-motion";
import Link from "next/link";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainImage from "../../public/image.svg";
import Image2 from "../../public/20.svg";
import Image3 from "../../public/image 11.svg";
import Image4 from "../../public/image 10.svg";
import Image5 from "../../public/Group.svg";
import Image6 from "../../public/last.svg";
import Image7 from "../../public/Group 2.svg";
import Image8 from "../../public/Group 3.svg";
export default function page() {
  const [isVisible, setIsVisible] = useState("visible 1");

  const changeText = () => {
    setIsVisible("visible 1");
  };

  const changeText2 = () => {
    setIsVisible("visible 2");
  };

  const changeText3 = () => {
    setIsVisible("visible 3");
  };

  return (
    <>
      <div className='landing'>
        <motion.div
          className='firstcard'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <nav>
            <div className='logoAndLink'>
              <div className='logo'>
                <svg
                  width='24'
                  height='18'
                  viewBox='0 0 36 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M26.2998 0C31.1412 0.000216879 35.0654 3.92515 35.0654 8.7666C35.0654 13.608 31.1412 17.533 26.2998 17.5332H9.19727V24H0V0H26.2998ZM9.98828 5.46094C8.20245 5.46094 6.75488 6.94109 6.75488 8.7666C6.75495 10.5921 8.20249 12.0723 9.98828 12.0723C11.774 12.0722 13.2216 10.592 13.2217 8.7666C13.2217 6.94115 11.774 5.46104 9.98828 5.46094ZM24.9346 5.46094C23.1487 5.46094 21.7002 6.94109 21.7002 8.7666C21.7003 10.5921 23.1488 12.0723 24.9346 12.0723C26.7202 12.0721 28.1679 10.5919 28.168 8.7666C28.168 6.94121 26.7202 5.46114 24.9346 5.46094Z'
                    fill='white'
                  />
                </svg>

                <h1>PayPiggy</h1>
              </div>
              <div className='links'>
                <div>About</div>
                <div>Company</div>
              </div>
            </div>
            <div className='auth'>
              <div className='login'>
                <Link href='/auth/login'>Login</Link>
              </div>
              <div className='createAccount'>
                <Link href='/signup'>Create an Account</Link>
                <div></div>
              </div>
            </div>
          </nav>
          <motion.div
            className='content'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className='writeup'>
              <h1>Smart Banking Made Simple</h1>
              <p>
                Send, save, spend fast with PayPiggy secure, simple, powerful
                today.
              </p>
              <div className='createAccount'>
                <Link href='/signup'>Create an Account</Link>
                <div></div>
              </div>
            </div>
            <motion.div
              className='image'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={MainImage}
                alt='main image'
                width={600}
                height={600}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div className='secondcontainer'>
          <div className='scrollBtu'>
            <div className='btu'>
              <span
                className={isVisible === "visible 1" ? "visible" : ""}
                onClick={changeText}
              ></span>
              <span
                className={isVisible === "visible 2" ? "visible" : ""}
                onClick={changeText2}
              ></span>
              <span
                className={isVisible === "visible 3" ? "visible" : ""}
                onClick={changeText3}
              ></span>
            </div>
          </div>
          <div className='writeup'>
            <div className='svg'>
              <svg
                width='40'
                height='456'
                viewBox='0 0 40 456'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <motion.line
                  x1='20.5'
                  x2='20.5'
                  y2='417'
                  stroke='#241E77'
                  viewport={{
                    once: true,
                  }}
                  initial={{ opacity: 0, transform: "translateY(100%)" }}
                  whileInView={{ opacity: 1, transform: "translateY(0%)" }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx='20'
                  cy='436'
                  r='9.5'
                  fill='#241E77'
                  stroke='#241E77'
                  viewport={{
                    once: true,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx='20'
                  cy='436'
                  r='19.5'
                  stroke='#241E77'
                  viewport={{
                    once: true,
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              </svg>
            </div>
            <motion.div
              className='mainWriteUp'
              viewport={{
                once: true,
              }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1>
                {isVisible === "visible 1"
                  ? "Your money’s safe space"
                  : isVisible === "visible 2"
                    ? "Your money’s secure space"
                    : isVisible === "visible 3"
                      ? "Your money’s protected space"
                      : "Your money’s safe space"}
              </h1>
              <motion.p
                viewport={{
                  once: true,
                }}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {isVisible === "visible 1"
                  ? "With PayPiggy, your money is safe and secure, giving you peace of mind and confidence in every transaction."
                  : isVisible === "visible 2"
                    ? "With PayPiggy, your money is protected by state-of-the-art security measures, ensuring your financial safety at all times."
                    : isVisible === "visible 3"
                      ? "With PayPiggy, your money is safeguarded with advanced security features, providing you with a secure and worry-free banking experience."
                      : "With PayPiggy, your money is safe and secure, giving you peace of mind and confidence in every transaction."}
              </motion.p>
              <div className='button'>
                <Link href='/signup'>Create an Account</Link>
                <div></div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className='image'
            viewport={{
              once: true,
            }}
            initial={{ opacity: 0, x: 100, scale: 0 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2 }}
          >
            <Image
              src={
                isVisible === "visible 1"
                  ? Image2
                  : isVisible === "visible 2"
                    ? Image7
                    : isVisible === "visible 3"
                      ? Image8
                      : Image2
              }
              alt='main image'
              width={400}
              height={400}
            />
          </motion.div>
        </div>

        <div className='topicContainer'>
          <svg
            width='40'
            height='224'
            viewBox='0 0 40 224'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.line
              x1='20.5'
              x2='20.5'
              y2='185'
              stroke='#241E77'
              viewport={{
                once: true,
              }}
              initial={{ opacity: 0, transform: "translateY(100%)" }}
              whileInView={{ opacity: 1, transform: "translateY(0%)" }}
              transition={{ duration: 1 }}
            />
            <motion.circle
              cx='20'
              cy='204'
              r='9.5'
              fill='#241E77'
              stroke='#241E77'
              viewport={{
                once: true,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.circle
              cx='20'
              cy='204'
              r='19.5'
              stroke='#241E77'
              initial={{ opacity: 0 }}
              viewport={{
                once: true,
              }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <motion.div
            className='text'
            viewport={{
              once: true,
            }}
            initial={{ opacity: 0, x: -100, scale: 0 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2 }}
          >
            <h1>What we do?</h1>
          </motion.div>
        </div>
        <div className='thirdContainer'>
          <motion.div
            className='card'
            viewport={{
              once: true,
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className='image'>
              <Image src={Image3} alt='main image' width={200} height={200} />
            </div>
            <h1>Send Money</h1>
          </motion.div>
          <motion.div
            className='card'
            viewport={{
              once: true,
            }}
            initial={{ opacity: 0, y: 110 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className='image'>
              <Image src={Image4} alt='main image' width={200} height={200} />
            </div>
            <h1>Save Money</h1>
          </motion.div>
          <motion.div
            className='card'
            viewport={{
              once: true,
            }}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <div className='image'>
              <Image src={Image5} alt='main image' width={200} height={200} />
            </div>
            <h1>Spend Money</h1>
          </motion.div>
        </div>
        <div className='aboutContainer'>
          <div className='text'>
            <motion.p
              viewport={{
                once: true,
              }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              PayPiggy is a leading fintech company dedicated to revolutionizing
              the way people manage their finances. With a focus on innovation
              and user-centric design, we provide a secure and intuitive
              platform for individuals to send, save, and spend money with ease.
              Our mission is to empower our users with smart banking solutions
              that simplify their financial lives and help them achieve their
              goals.
            </motion.p>
            <motion.div
              className='button'
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{
                once: true,
              }}
            >
              <Link href='/signup'>Create an Account</Link>
              <div></div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className='lastContainer'
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{
            once: true,
          }}
        >
          <motion.div
            className='image'
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 2 }}
          >
            <Image src={Image6} alt='main image' width={600} height={600} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{
              once: true,
            }}
          >
            Choose PayPiggy for smarter banking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{
              once: true,
            }}
          >
            Pick PayPiggy for fast, secure money management every day now.
          </motion.p>
          <motion.div
            className='button'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{
              once: true,
            }}
          >
            <Link href='/signup'>Create an Account</Link>
            <div></div>
          </motion.div>
        </motion.div>
      </div>
      <motion.footer
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{
          once: true,
        }}
      >
        <div className='mainFooter'>
          <div className='logo'>
            <svg
              width='62'
              height='43'
              viewBox='0 0 62 43'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M46.2168 0C54.725 0 61.6219 6.89714 61.6221 15.4053C61.6221 23.9136 54.7251 30.8115 46.2168 30.8115H16.1631V42.1758H0V0H46.2168ZM17.5527 9.59668C14.4146 9.59668 11.8704 12.1974 11.8701 15.4053C11.8701 18.6133 14.4144 21.2148 17.5527 21.2148C20.6909 21.2147 23.2344 18.6132 23.2344 15.4053C23.2341 12.1975 20.6908 9.59684 17.5527 9.59668ZM43.8174 9.59668C40.6794 9.59689 38.136 12.1976 38.1357 15.4053C38.1357 18.6132 40.6793 21.2146 43.8174 21.2148C46.9557 21.2148 49.5 18.6133 49.5 15.4053C49.4998 12.1974 46.9555 9.59668 43.8174 9.59668Z'
                fill='url(#paint0_linear_34_3709)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_34_3709'
                  x1='1.08212'
                  y1='5.79448e-07'
                  x2='60.5399'
                  y2='42.1758'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#241E77' />
                  <stop offset='1' stopColor='#4337DD' />
                </linearGradient>
              </defs>
            </svg>
            <h1>PayPiggy</h1>
          </div>
          <div className='navs'>
            <div className='title'>
              <h1>Links</h1>
            </div>
            <Link href='/Home'>Home</Link>
            <Link href='/about'>About us</Link>
            <Link href='/company'>Company</Link>
            <Link href='/terms'>Terms</Link>
          </div>
          <div className='socails'>
            <div className='title'>
              <h1>Socials</h1>
            </div>
            <div className='media'>
              <a
                href='http://facebook.com/PayPiggy'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_34_3723)'>
                    <path d='M27.7793 0H2.21484C0.990234 0 0 0.966797 0 2.16211V27.832C0 29.0273 0.990234 30 2.21484 30H27.7793C29.0039 30 30 29.0273 30 27.8379V2.16211C30 0.966797 29.0039 0 27.7793 0ZM8.90039 25.5645H4.44727V11.2441H8.90039V25.5645ZM6.67383 9.29297C5.24414 9.29297 4.08984 8.13867 4.08984 6.71484C4.08984 5.29102 5.24414 4.13672 6.67383 4.13672C8.09766 4.13672 9.25195 5.29102 9.25195 6.71484C9.25195 8.13281 8.09766 9.29297 6.67383 9.29297ZM25.5645 25.5645H21.1172V18.6035C21.1172 16.9453 21.0879 14.8066 18.8027 14.8066C16.4883 14.8066 16.1367 16.6172 16.1367 18.4863V25.5645H11.6953V11.2441H15.9609V13.2012H16.0195C16.6113 12.0762 18.0645 10.8867 20.2266 10.8867C24.7324 10.8867 25.5645 13.8516 25.5645 17.707V25.5645Z' />
                  </g>
                  <defs>
                    <clipPath id='clip0_34_3723'>
                      <rect width='30' height='30' />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_34_3722)'>
                    <path d='M15 0C6.7158 0 0 6.7158 0 15C0 22.0344 4.8432 27.9372 11.3766 29.5584V19.584H8.2836V15H11.3766V13.0248C11.3766 7.9194 13.6872 5.553 18.6996 5.553C19.65 5.553 21.2898 5.7396 21.9606 5.9256V10.0806C21.6066 10.0434 20.9916 10.0248 20.2278 10.0248C17.7684 10.0248 16.818 10.9566 16.818 13.3788V15H21.7176L20.8758 19.584H16.818V29.8902C24.2454 28.9932 30.0006 22.6692 30.0006 15C30 6.7158 23.2842 0 15 0Z' />
                  </g>
                  <defs>
                    <clipPath id='clip0_34_3722'>
                      <rect width='30' height='30' />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M22.9079 2.37988H27.1247L17.9121 12.9092L28.75 27.2373H20.264L13.6175 18.5474L6.01243 27.2373H1.79304L11.6468 15.975L1.25 2.37988H9.95139L15.9592 10.3228L22.9079 2.37988ZM21.4279 24.7134H23.7645L8.68174 4.7713H6.17433L21.4279 24.7134Z' />
                </svg>
              </a>
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_34_3720)'>
                    <path d='M15 2.70117C19.0078 2.70117 19.4824 2.71875 21.0586 2.78906C22.5234 2.85352 23.3145 3.09961 23.8418 3.30469C24.5391 3.57422 25.043 3.90234 25.5645 4.42383C26.0918 4.95117 26.4141 5.44922 26.6836 6.14648C26.8887 6.67383 27.1348 7.4707 27.1992 8.92969C27.2695 10.5117 27.2871 10.9863 27.2871 14.9883C27.2871 18.9961 27.2695 19.4707 27.1992 21.0469C27.1348 22.5117 26.8887 23.3027 26.6836 23.8301C26.4141 24.5273 26.0859 25.0313 25.5645 25.5527C25.0371 26.0801 24.5391 26.4023 23.8418 26.6719C23.3145 26.877 22.5176 27.123 21.0586 27.1875C19.4766 27.2578 19.002 27.2754 15 27.2754C10.9922 27.2754 10.5176 27.2578 8.94141 27.1875C7.47656 27.123 6.68555 26.877 6.1582 26.6719C5.46094 26.4023 4.95703 26.0742 4.43555 25.5527C3.9082 25.0254 3.58594 24.5273 3.31641 23.8301C3.11133 23.3027 2.86523 22.5059 2.80078 21.0469C2.73047 19.4648 2.71289 18.9902 2.71289 14.9883C2.71289 10.9805 2.73047 10.5059 2.80078 8.92969C2.86523 7.46484 3.11133 6.67383 3.31641 6.14648C3.58594 5.44922 3.91406 4.94531 4.43555 4.42383C4.96289 3.89648 5.46094 3.57422 6.1582 3.30469C6.68555 3.09961 7.48242 2.85352 8.94141 2.78906C10.5176 2.71875 10.9922 2.70117 15 2.70117ZM15 0C10.9277 0 10.418 0.0175781 8.81836 0.0878906C7.22461 0.158203 6.12891 0.416016 5.17969 0.785156C4.18945 1.17187 3.35156 1.68164 2.51953 2.51953C1.68164 3.35156 1.17188 4.18945 0.785156 5.17383C0.416016 6.12891 0.158203 7.21875 0.0878906 8.8125C0.0175781 10.418 0 10.9277 0 15C0 19.0723 0.0175781 19.582 0.0878906 21.1816C0.158203 22.7754 0.416016 23.8711 0.785156 24.8203C1.17188 25.8105 1.68164 26.6484 2.51953 27.4805C3.35156 28.3125 4.18945 28.8281 5.17383 29.209C6.12891 29.5781 7.21875 29.8359 8.8125 29.9062C10.4121 29.9766 10.9219 29.9941 14.9941 29.9941C19.0664 29.9941 19.5762 29.9766 21.1758 29.9062C22.7695 29.8359 23.8652 29.5781 24.8145 29.209C25.7988 28.8281 26.6367 28.3125 27.4688 27.4805C28.3008 26.6484 28.8164 25.8105 29.1973 24.8262C29.5664 23.8711 29.8242 22.7813 29.8945 21.1875C29.9648 19.5879 29.9824 19.0781 29.9824 15.0059C29.9824 10.9336 29.9648 10.4238 29.8945 8.82422C29.8242 7.23047 29.5664 6.13477 29.1973 5.18555C28.8281 4.18945 28.3184 3.35156 27.4805 2.51953C26.6484 1.6875 25.8105 1.17188 24.8262 0.791016C23.8711 0.421875 22.7813 0.164062 21.1875 0.09375C19.582 0.0175781 19.0723 0 15 0Z' />
                    <path d='M15 7.29492C10.7461 7.29492 7.29492 10.7461 7.29492 15C7.29492 19.2539 10.7461 22.7051 15 22.7051C19.2539 22.7051 22.7051 19.2539 22.7051 15C22.7051 10.7461 19.2539 7.29492 15 7.29492ZM15 19.998C12.2402 19.998 10.002 17.7598 10.002 15C10.002 12.2402 12.2402 10.002 15 10.002C17.7598 10.002 19.998 12.2402 19.998 15C19.998 17.7598 17.7598 19.998 15 19.998Z' />
                    <path d='M24.8086 6.99018C24.8086 7.98627 24 8.78901 23.0098 8.78901C22.0137 8.78901 21.2109 7.98041 21.2109 6.99018C21.2109 5.99408 22.0195 5.19135 23.0098 5.19135C24 5.19135 24.8086 5.99994 24.8086 6.99018Z' />
                  </g>
                  <defs>
                    <clipPath id='clip0_34_3720'>
                      <rect width='30' height='30' />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href='https://jacobshevy.vercel.app/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M20.6914 16.5C20.5805 19.7806 19.9314 22.6906 18.9688 24.8086C18.2018 26.4958 17.3295 27.5007 16.502 27.9561C16.1587 27.9844 15.8115 28 15.4609 28C15.1095 28 14.7611 27.9845 14.417 27.9561C13.5898 27.5003 12.7177 26.495 11.9512 24.8086C10.9885 22.6907 10.3394 19.7806 10.2285 16.5H20.6914ZM8.22754 16.5C8.33872 20.0155 9.03074 23.2185 10.1299 25.6367C10.372 26.1694 10.6449 26.679 10.9424 27.1543C6.56864 25.4575 3.3858 21.374 3 16.5H8.22754ZM27.9209 16.5C27.5351 21.3743 24.3517 25.4577 19.9775 27.1543C20.2751 26.679 20.5479 26.1694 20.79 25.6367C21.8892 23.2185 22.5812 20.0156 22.6924 16.5H27.9209ZM19.9775 3.84473C24.3519 5.54122 27.5351 9.62554 27.9209 14.5H22.6924C22.5812 10.9844 21.8892 7.78147 20.79 5.36328C20.5478 4.8303 20.2753 4.32027 19.9775 3.84473ZM10.9424 3.84473C10.6447 4.32022 10.3721 4.83036 10.1299 5.36328C9.03074 7.78146 8.33872 10.9845 8.22754 14.5H3C3.38581 9.62585 6.56847 5.54142 10.9424 3.84473ZM15.4609 3C15.8115 3.00001 16.1587 3.01465 16.502 3.04297C17.3297 3.49826 18.2017 4.50397 18.9688 6.19141C19.9314 8.30935 20.5805 11.2194 20.6914 14.5H10.2285C10.3394 11.2194 10.9885 8.30935 11.9512 6.19141C12.7178 4.50474 13.5896 3.4986 14.417 3.04297C14.761 3.01454 15.1095 3 15.4609 3Z' />
                </svg>
              </a>
            </div>
          </div>
          <div className='creator'>
            <p>
              Created by
              <a
                href='https://jacobshevy.vercel.app/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {" "}
                Ejiro jacob Oshevire
              </a>
            </p>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
