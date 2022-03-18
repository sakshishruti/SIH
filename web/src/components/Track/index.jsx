import { useRef, useState } from "react";
import { Player, ControlBar, ForwardControl } from "video-react";
import video from "../../assets/video.mp4";
import img1 from "../../assets/7.jpg";
import img2 from "../../assets/26.jpg";
import img3 from "../../assets/65.jpg";
import img4 from "../../assets/121.jpg";

import { getNumberPlates } from "../../backend";
import { Link } from "react-router-dom";

export default function Track() {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const track = async () => {
    setLoading(true);
    setNumbers([]);
    const response = await getNumberPlates();

    let i = 0;
    const timer = setInterval(interval, 2000);
    function interval() {
      if (i === response.length - 1) {
        clearTimer();
      }
      setNumbers((prev) => [...prev, response[i]]);
      ref.current.scrollTop = ref.current.scrollHeight;
      i++;
    }
    function clearTimer() {
      clearInterval(timer);
    }
    setLoading(false);
  };
  return (
    <>
      {/* <h1 className="text-center text-4xl font-bold">Track car details</h1> */}
      <div className="relative h-[400px] w-50 overflow-hidden">
        <Player playsInline src={video} height={200} width={100}>
          <ControlBar autoHide={false}>
            <ForwardControl seconds={5} order={3.1} />
            <ForwardControl seconds={10} order={3.2} />
            <ForwardControl seconds={30} order={3.3} />
          </ControlBar>
        </Player>
      </div>
      <div class="grid grid-cols-2 gap-10 md:grid-cols-2 my-10 px-10">
        <Link to="/track?carId=3" className="rounded">
          <img src={img3} alt="" className="rounded" />
        </Link>
        <Link to="/track?carId=4" className="rounded">
          <img src={img4} alt="" className="rounded" />
        </Link>
        <Link to="/track?carId=1" className="cursor-pointer hover:shadow-lg">
          <img src={img1} alt="" className="rounded" />
        </Link>
        <Link to="/track?carId=2" className="rounded">
          <img src={img2} alt="" className="rounded" />
        </Link>
      </div>
    </>
  );
}
