import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/Authentication/RoleSelection";
import JEEForm from "./pages/Authentication/JEEForm";
import RegisterStudent from "./pages/Authentication/RegisterStudent"
import LoginStudent from "./pages/Authentication/LoginStudent"
import Profile from "./pages/Profile";
import Updates from "./pages/Updates";
import Uploads from "./pages/Uploads";
import Help from "./pages/Help";
import SidebarLayout from "./components/SidebarLayout";
// Import other pages as needed
// Import other dashboards as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Role selection page */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/JEE-form" element={<JEEForm />} />
        <Route path="/Register-Student" element={<RegisterStudent/>} />
        <Route path="/Login-Student" element={<LoginStudent/>}/>

        {/* Dashboards */}
        <Route element={<SidebarLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;