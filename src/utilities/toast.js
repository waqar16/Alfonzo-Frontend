import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
export const notify = (response, type) =>
  toast(response, {
    duration: 4000,
    position: "top-center",

    // Styling
    style: {
      fontSize: "18px", // Increase font size
      padding: "16px", // Increase padding
      maxWidth: "60%", // Increase minimum width
    },
    className: "",

    // Custom Icon
    icon:
      type == "error" ? (
        <FaTimesCircle size={20} color={"red"} />
      ) : (
        <FaCheckCircle size={20} color={"green"} />
      ),

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
