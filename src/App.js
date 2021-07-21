import './App.css';
import NavBar from './components/Moleculars/NavBar';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login';
import Service from './pages/serviceAdvisor/Dashboard'
import Test from './pages/serviceAdvisor/Test'

import Customer from './pages/customer/Index'
import VehicleDetails from './pages/customer/VehicleProfile'

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStaff from './pages/admin/AdminStaff';
import VehicleInfo from './pages/serviceAdvisor/VehicleInfo';
import Dashboard from './pages/technician/Dashboard';
import ServiceSummary from './pages/technician/ServiceSummary';
import ServiceProgress from './pages/technician/ServiceProgress';





function App() {
  return (
    <div className="overflow-hidden">

      {/* <NavBar/> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/serviceadvisor" exact component={Service} />

          <Route path="/serviceadvisor/vehicleinfo" exact component={VehicleInfo} />

          <Route path="/test" exact component={Test} />
          <Route path="/customer" exact component={Customer} />
          <Route path="/customer/vehicle" exact component={VehicleDetails} />
          <Route path="/admin" exact component={AdminDashboard} />

          <Route path="/admin/staff" exact component={AdminStaff} />
          <Route path="/admin/staff/:staffid" component={AdminStaff} />

          <Route path="/technician/dashboard" exact component={Dashboard} />
          <Route path="/technician/summary" exact component={ServiceSummary} />
          <Route path="/technician/progress" exact component={ServiceProgress} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
