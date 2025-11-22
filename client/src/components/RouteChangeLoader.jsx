import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/navlogo.svg";

/**
 * Velvet Plate Motion Loader — shows briefly on every route change.
 * A glowing orb morphs in, your logo fades in, everything fades out elegantly.
 */
export default function RouteMotionLoader() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-white/90 backdrop-blur-sm"
        >
          {/* glowing morphing orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.9, 1.1, 1],
              opacity: [0, 1, 1],
              rotate: [0, 15, -15, 0],
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.45, 0, 0.55, 1],
            }}
            className="relative flex items-center justify-center"
          >
            {/* pulsing gradient blob */}
            <motion.div
              className="absolute h-36 w-36 rounded-full bg-gradient-to-tr from-[#ff7a1a] via-[#ffb98f] to-[#ffd9c4] blur-3xl opacity-80"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />

            {/* logo card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
            >
              <motion.img
                src={Logo}
                alt="Velvet Plate"
                className="h-10 w-10"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
