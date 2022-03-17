import { Outlet } from "react-router-dom";
import AnimatedComponent from "../Reusable/AnimatedComponent";
export default function Home() {
  return (
    <AnimatedComponent>
      <Outlet />
    </AnimatedComponent>
  );
}
