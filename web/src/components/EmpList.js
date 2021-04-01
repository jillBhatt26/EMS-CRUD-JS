// hooks imports
import { useContext } from "react";

// context imports
import { EmpContext } from "../contexts/EmpContext";

// notifications library imports
import { toast } from "react-toastify";

const EmpList = () => {
    // context de-structuring
    const { emp, deleteEmp, editClickHandler } = useContext(EmpContext);

    // component functions
    const deleteNotify = () => {
        toast.error("Employee Deleted!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };

    return emp.length > 0 ? (
        <div>
            <table className="striped centered">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Post</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {emp.map((employee, index) => (
                        <tr key={employee._id}>
                            <td>{++index}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.post}</td>
                            <td>
                                <button
                                    className="btn waves-effect waves-dark blue"
                                    onClick={() =>
                                        editClickHandler(employee._id)
                                    }
                                >
                                    <i className="material-icons right">edit</i>
                                    Edit
                                </button>
                                <button
                                    className="btn waves-effect waves-dark red"
                                    onClick={() => {
                                        deleteEmp(employee._id);
                                        deleteNotify();
                                    }}
                                >
                                    <i className="material-icons right">
                                        delete
                                    </i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <h5 className="center mt-5">No employees details available</h5>
    );
};

export default EmpList;
