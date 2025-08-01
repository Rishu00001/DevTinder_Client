import React, { useEffect, useState } from "react";
import { server_url } from "../utils/constants";
import axios from "axios";

function Premium() {
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlePurchase = async (type) => {
    const order = await axios.post(
      `${server_url}/api/payment/create`,
      {
        membership_type: type,
      },
      { withCredentials: true }
    );
    console.log(order);
    //It should open the razorpay dialogue box
    const { amount, currency, orderId, notes } = order.data;
    const options = {
      key: "rzp_test_IhTYY1IURKw1g6",
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to devs",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "6202507476",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremium,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  useEffect(() => {
    verifyPremium();
  }, []);
  const verifyPremium = async (req, res) => {
    try {
      setLoading(true);
      const res = await axios.get(`${server_url}/api/payment/verify`, {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setPremium(res.data.isPremium);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div>Please wait..</div>;
  if (premium) {
    return <div>You are now a Premium user</div>;
  } else
    return (
      <div className="h-[90dvh] w-full flex justify-center items-center px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl overflow-auto scroll-hide h-full">
          {/* Gold  Plan */}
          <div className="card w-full max-w-sm bg-base-100">
            <div className="card-body">
              <span className="badge badge-warning w-fit">Gold Membership</span>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-3xl font-bold">Premium</h2>
                <span className="text-xl font-semibold">$29/mo</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                {[
                  "High-resolution image generation",
                  "Customizable style templates",
                  "Batch processing capabilities",
                  "AI-driven image enhancements",
                ].map((item, i) => (
                  <li key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block size-4 me-2 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}

                {/* Disabled Features */}
                {[
                  "Seamless cloud integration",
                  "Real-time collaboration tools",
                ].map((item, i) => (
                  <li key={i} className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block size-4 me-2 text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handlePurchase("gold")}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* OR Divider */}
          <div className="divider lg:divider-horizontal">OR</div>

          {/* Silver Plan */}
          <div className="card w-full max-w-sm bg-base-100 ">
            <div className="card-body">
              <span className="badge badge-neutral w-fit">
                Silver Membership
              </span>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-3xl font-bold">Basic Plan</h2>
                <span className="text-xl font-semibold">$9/mo</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                {["Basic image generation", "Limited template selection"].map(
                  (item, i) => (
                    <li key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block size-4 me-2 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  )
                )}

                {/* Not included */}
                {[
                  "Customizable style templates",
                  "Batch processing",
                  "AI enhancements",
                ].map((item, i) => (
                  <li key={i} className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block size-4 me-2 text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  className="btn btn-outline btn-block"
                  onClick={() => handlePurchase("silver")}
                >
                  Try for Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Premium;
