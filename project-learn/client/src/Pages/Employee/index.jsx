import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getallDatas } from '../../Services/Uitilities';
import { Endpoints } from '../../Config';
import CommonPageTables from '../../Component/PageTables';
import { EmployeeValues } from '../../Component/InitialValues';
import { FormModal } from './FormModal';

export const Employee = () => {
    const header = ["S.No", "name", "email", "images", "createdAt", "updatedAt", "Action"];
    const trigger = useSelector((state) => state?.apiTrigger)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const [formAction, setformAction] = useState("Add");
    const [showModal, setshowModal] = useState(false);
    const endpoints = Endpoints?.employee;

    useEffect(() => {
        getallDatas(endpoints, setData, setLoading)
    }, [trigger])

    return (
        <div>
            <CommonPageTables
                pageName="Employee"
                header={header}
                data={data}
                endpoints={endpoints}
                setLoading={setLoading}
                loading={loading}
                formData={EmployeeValues}
                setFormData={setFormData}
                setshowModal={setshowModal}
                setformAction={setformAction}
            />
            <FormModal
                showModal={showModal}
                setshowModal={setshowModal}
                formAction={formAction}
                formData={formData}
                endpoints={endpoints}
            />
        </div>
    )
}
