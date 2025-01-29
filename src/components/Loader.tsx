import { motion } from "framer-motion";
import { string } from "zod";

interface LoaderProps {
  label?: string;
}

const Loader = ({ label }: LoaderProps) => {
  {
    return (
      <div className="m-4">
        <div className="flex justify-center items-center">
          <motion.div
            className="relative w-20 h-20 flex justify-center items-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          >
            <motion.div
              className="absolute w-full h-full border-4 border-transparent border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute w-10 h-10 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
        <p className="mt-2 text-sm text-center text-gray-500">{label}</p>
      </div>
    );
  }
};

export default Loader;
