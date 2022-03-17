import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: "-100vh",
    scale: 0.9,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "100vh",
    scale: 1.1,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedComponent = (props) => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
      {props.children}
    </motion.div>
  );
};

export default AnimatedComponent;
