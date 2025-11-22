import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function ReservationCTA() {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Handle button click
  const handleReserve = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAlert(true);
      // Auto close the alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
    }, 1200);
  };

  return (
    <>
      <section id="reserve" className="max-w-6xl mx-auto my-20 px-6">
        <div className="bg-gradient-to-br from-white via-[#fff3e8] to-[#ffe7d1] border border-orange-100 rounded-3xl p-6 md:p-10 grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          {/* Left Panel: Reservation Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b16]">
              Reserve your table
            </h2>
            <p className="text-[#6b5540] mt-2">
              Dinner 5pm–10:30pm (Tue–Sun). Brunch on Sundays Closed.
            </p>

            <div className="bg-white border border-orange-100 rounded-2xl shadow-md mt-5 p-6 space-y-4">
              {/* Name Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[#6b5540] text-sm">Name</label>
                <input
                  className="border border-orange-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your full name"
                />
              </div>

              {/* Date and Time Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[#6b5540] text-sm">Date</label>
                  <input
                    type="date"
                    className="border border-orange-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#6b5540] text-sm">Time</label>
                  <input
                  required
                    type="time"
                    className="border border-orange-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1">
                <label className="text-[#6b5540] text-sm">Guests</label>
                <input
                  type="number"
                  min="1"
                  className="border border-orange-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="2"
                />
              </div>

              <button
                onClick={handleReserve}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-[20px_2px_20px_2px]  shadow-md transition w-fit disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Reserving…" : "Reserve a table"}
              </button>
            </div>
          </div>

          {/* Right Panel: Private Dining */}
          <div className="bg-white border border-orange-100 rounded-2xl shadow-md p-6 space-y-3">
            <h3 className="text-xl font-semibold text-[#1e1b16]">
              Private dining
            </h3>
            <p className="text-[#6b5540]">
              Intimate celebrations up to 18 guests in our candle-lit room.
              Custom tasting menus available.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="border border-dashed border-orange-500 text-orange-700 bg-orange-50 rounded-full px-4 py-1 text-sm">
                Birthday tasting
              </span>
              <span className="border border-dashed border-orange-500 text-orange-700 bg-orange-50 rounded-full px-4 py-1 text-sm">
                Chef's table
              </span>
              <span className="border border-dashed border-orange-500 text-orange-700 bg-orange-50 rounded-full px-4 py-1 text-sm">
                Wine pairing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Orange Success Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-orange-100 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.2 4.8 12 3.4 13.4 9 19l12-12-1.4-1.4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1e1b16]">
              Booking request sent!
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              A confirmation message will be sent to you within 2 hours. 🍽️
            </p>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAlert(false)}
                className="rounded-[20px_2px_20px_2px]  bg-orange-500 text-white font-medium px-5 py-2 hover:bg-orange-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
