import { useState, useEffect, createContext } from 'react';

// create and export a context
export const EmpContext = createContext();

// create a context provider and default export it
const EmpContextProvider = ({ children }) => {
    const [emp, setEmp] = useState([]);
    const [formBtnName, setFormBtnName] = useState('add');
    const [empToUpdate, setEmpToUpdate] = useState(null);

    const fetchEmp = () => {
        fetch('/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setEmp(data.employees);
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    const addEmp = async newEmp => {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify(newEmp),
            headers: { 'content-type': 'application/json' }
        });

        const data = await response.json();

        const { empAdded } = data;

        setEmp([...emp, empAdded]);
    };

    const deleteEmp = async id => {
        await fetch(`/${id}`, {
            method: 'DELETE'
        });

        setEmp(
            emp.filter(employee => {
                return employee._id !== id;
            })
        );
    };

    const fetchEmpById = id => {
        fetch(`/${id}`)
            .then(res => res.json())
            .then(data => {
                setEmpToUpdate(data.employee);
            })
            .catch(err => console.log(err));
    };

    const editClickHandler = id => {
        setFormBtnName('edit');

        fetchEmpById(id);
    };

    const updateEmployee = empDetails => {
        const updateEmp = {
            name: empDetails.name,
            department: empDetails.department,
            post: empDetails.post
        };

        fetch(`/${empDetails.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateEmp),
            headers: { 'content-type': 'application/json' }
        })
            .then(() => {
                updateEmp._id = empDetails.id;

                const i = emp.findIndex(e => e._id === empDetails.id);

                emp[i] = updateEmp;

                setEmp([...emp]);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchEmp();
    }, []);

    return (
        <EmpContext.Provider
            value={{
                emp,
                formBtnName,
                addEmp,
                deleteEmp,
                editClickHandler,
                empToUpdate,
                setEmpToUpdate,
                setFormBtnName,
                updateEmployee
            }}
        >
            {children}
        </EmpContext.Provider>
    );
};

export default EmpContextProvider;
