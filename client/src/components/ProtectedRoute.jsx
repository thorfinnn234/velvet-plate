// import { Navigate, useLocation } from "react-router-dom";
// import { useAuthStore } from "../store/auth";

// export default function ProtectedRoute({ children }) {
//   const token = useAuthStore((s) => s.token);
//   const location = useLocation();

//   if (!token) {
//     return (
//       <Navigate
//         to="/auth/login"
//         replace
//         state={{ from: location.pathname || "/checkout" }}
//       />
//     );
//   }
//   return children;
// }
