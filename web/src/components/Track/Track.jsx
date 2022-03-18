import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import img1 from "../../assets/7.jpg";
import img2 from "../../assets/26.jpg";
import img3 from "../../assets/65.jpg";
import img4 from "../../assets/121.jpg";
import axios from "axios";

export default function Track() {
  const { search } = useLocation();
  const carId = search.split("=")[1];
  const images = [img1, img2, img3, img4];
  const numbers = ["29A33185", "30A61235", "29A90101", "30A61329"];
  const [vehicleNo, setVehicleNo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const numbers = {
          1: "7",
          2: "26",
          3: "65",
          4: "121",
        };
        const response = await axios.get(`https://43ad-34-133-44-14.ngrok.io/predict?tes=${numbers[carId]}`);
        setVehicleNo(response.data.split("'")[1]);
        setLoading(false);
      } catch (err) {}
    })();
  }, []);

  return (
    <div className="w-[800px] mt-5 mx-auto">
      <img src={images[carId - 1]} alt="image" className="rounded shadow-lg" />
      <div>
        <h3 className="text-center text-2xl flex justify-center gap-2 mt-1">
          <span className="font-bold">Vehicle number:</span>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 w-20 bg-slate-400 rounded"></div>
            </div>
          ) : (
            vehicleNo
          )}
        </h3>
        <div className="flex items-center justify-center w-full">
          <button
            disabled
            className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-[#295ba5] rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none disabled:opacity-60"
          >
            View Car Details
          </button>
        </div>
      </div>
    </div>
  );
}
