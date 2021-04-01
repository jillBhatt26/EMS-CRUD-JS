// hooks imports
import { useState, useEffect, useContext } from "react";

// context imports
import { EmpContext } from "../contexts/EmpContext";

// notifications library imports
import { toast } from "react-toastify";

const EmpForm = () => {
    // state definitions
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [post, setPost] = useState("");

    // contexts de-structuring
    const {
        addEmp,
        formBtnName,
        setFormBtnName,
        empToUpdate,
        setEmpToUpdate,
        updateEmployee,
    } = useContext(EmpContext);

    // Component functions
    const reset = () => {
        setName("");
        setDepartment("");
        setPost("");
        setEmpToUpdate(null);
        setFormBtnName("add");
    };

    const addNotify = () => {
        toast.success("New Employee Added!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };

    const updateNotify = () => {
        toast.success("Employee Updated!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };

    const emptyError = () => {
        toast.error("All Fields Required!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };

    useEffect(() => {
        if (empToUpdate !== null) {
            setName(empToUpdate.name);
            setDepartment(empToUpdate.department);
            setPost(empToUpdate.post);
        }
    }, [empToUpdate]);

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const empDetails = {
            name,
            department,
            post,
        };

        if (
            empDetails.name === "" ||
            empDetails.department === "" ||
            empDetails.post === ""
        ) {
            emptyError();
        } else {
            if (formBtnName === "add") {
                addEmp(empDetails);

                addNotify();
            } else if (formBtnName === "edit") {
                empDetails.id = empToUpdate._id;

                updateEmployee(empDetails);

                updateNotify();
            }
        }

        reset();
    };

    return (
        <div className="row">
            <form
                autoComplete="off"
                onSubmit={formSubmitHandler}
                className="col s6 offset-s3"
            >
                <div className="input-field">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </div>

                <div className="input-field">
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Department"
                    />
                </div>

                <div className="input-field">
                    <input
                        type="text"
                        id="post"
                        name="post"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Post"
                    />
                </div>

                <div className="center">
                    <button className="btn waves-effect waves-light green darken-3">
                        <i className="material-icons right">{formBtnName}</i>
                        {formBtnName}
                    </button>
                    {empToUpdate && (
                        <button
                            className="btn waves-effect waves-light red darken-3"
                            onClick={() => {
                                reset();
                            }}
                        >
                            <i className="material-icons right">cancel</i>
                            clear
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EmpForm;
