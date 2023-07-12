import Home from "./components/HomePage/Home";
import Register from "./components/Forms/Register";
import MainDashBoard from "./components/Dashboard/MainDashBoard";
import AccountDetails from "./components/Dashboard/AccountDetails";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTransaction from "./components/Forms/AddTransaction";
import EditTransaction from "./components/Forms/EditTransaction";
import AddAccount from "./components/Forms/AddAccount";
import EditAccount from "./components/Forms/EditAccount";
import Login from "./components/Forms/Login";
import AuthenticatedRoute from "./components/AuthRoute/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <AuthenticatedRoute>
            <MainDashBoard />
          </AuthenticatedRoute>
        } />

        <Route path="/account/:id" element={
          <AuthenticatedRoute>
            <AccountDetails />
          </AuthenticatedRoute>
        } />

        <Route path="/add-transaction/:id" element={
          <AuthenticatedRoute>
            <AddTransaction />
          </AuthenticatedRoute>
        } />

        <Route path="/edit-transaction/:id" element={<AuthenticatedRoute>
          <EditTransaction />
          </AuthenticatedRoute>
        } />

        <Route path="/add-account" element={
          <AuthenticatedRoute>
            <AddAccount />
          </AuthenticatedRoute>
        } />

        <Route path="/edit-account/:id" element={
          <AuthenticatedRoute>
            <EditAccount />
          </AuthenticatedRoute>
        } />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
