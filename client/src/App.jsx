import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Property from "./pages/Property";
import Page from "./pages/Page";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AddProperty from "./Components/AddProperty";
import DisplayProperty from "./Components/DisplayProperty";
import DashDisplay from "./Dashboard/DashDisplay";
import DashProperty from "./Dashboard/DashProperty";
import Order from "./Components/Order";
import Message from "./Dashboard/Message";
import EditProfile from "./Dashboard/EditProfile";
import Profile from "./Dashboard/Profile";
import Seller from "./Components/Seller";
import EmailVerification from "./Components/EmailVerification";
import ResendEmail from "./Components/ResendEmail";
import PhoneLogin from "./Components/PhoneLogin";
import SendPhone from "./Components/SendPhone";
import Settings from "./Dashboard/Settings";
import GoogleSuccess from "./Components/GoogleSuccess";
import PrivateRoutes from "./Components/ProtectedRoutes"; // ✅
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProperty from "./Components/UpdateProperty";
import { IoThunderstormOutline } from "react-icons/io5";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Toaster  position="top-right" className="bg-white text-green-400 border border-gray-200 shadow-md" />
        <Routes>
          {/* Public Routes */}
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/phone" element={<SendPhone />} />
          <Route path="/property" element={<Page />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/display" element={<DisplayProperty />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

          <Route path="/verify" element={<EmailVerification />} />
          {/* ✅ Protected Routes Group */}
          <Route element={<PrivateRoutes />}>
            <Route path="/resendemail" element={<ResendEmail />} />
            <Route path="/UpdateProperty" element={<UpdateProperty />} />
            <Route path="/dashboard" element={<DashDisplay />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/dashproperty" element={<DashProperty />} />
            <Route path="/order" element={<Order />} />
            {/* <Route path="/messages" element={<Message />} /> */}
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/setting" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
