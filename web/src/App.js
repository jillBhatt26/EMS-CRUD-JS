// context provider imports
import EmpContextProvider from "./contexts/EmpContext";

// component imports
import EmpForm from "./components/EmpForm";
import EmpList from "./components/EmpList";

// toast notifications library imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast configuration
toast.configure();

function App() {
    return (
        <div className="container">
            <EmpContextProvider>
                <h3 className="center">Employees</h3>
                <EmpForm />
                <EmpList />
            </EmpContextProvider>
        </div>
    );
}

export default App;
