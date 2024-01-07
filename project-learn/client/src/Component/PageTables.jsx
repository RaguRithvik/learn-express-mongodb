import React, { Fragment, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import { Baseurls } from '../Config';
import moment from 'moment';

const CommonPageTables = ({ pageName, header, data, setLoading, loading, formData, setFormData, setshowModal, setformAction, endpoints }) => {
  const isHeaderValid = (data) => {
    return header?.length > 0 && header?.some((column) => Object.keys(data).includes(column));
  };
  const handleEdit = (id) => {
    const editData = data?.filter(prev => prev?._id === id)[0]
    const updatedC = {};
    for (const key in formData) {
      if (editData?.hasOwnProperty(key)) {
        updatedC[key] = editData[key];
      }
    }
    setformAction("Update");
    setFormData({ ...updatedC, id: editData?._id })
    setshowModal(true)
  }
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteID] = useState(null)

  const handleDelete = (id) => {
    setDeleteModal(true);
    setDeleteID(id)
  }
  return (
    <div className='mt-100'>
      <div className="d-flex justify-content-between mb-4">
        <h4 className=''>{pageName} Details</h4>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setshowModal(true)
            setFormData(formData)
            setformAction("Add")
          }}
        >
          Add {pageName}
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            {header?.length > 0 && header?.map((data, index) => {
              return (<th scope="col" key={index} className='text-capitalize'>{data}</th>)
            })}
          </tr>
        </thead>
        <tbody>
          <>
            {loading &&
              <tr>
                <td colSpan={header?.length} className='pt-3'>
                  <div className="loading-cell">
                    <div className="loading-spinner" />
                  </div>
                </td>
              </tr>}
            {data?.length > 0 ? data?.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {isHeaderValid(rowData) && header?.map((column, columnIndex) => {
                  if (rowData[column]) {
                    return (<td key={columnIndex}>{column === "images" ? <img src={`${Baseurls?.backend}${rowData[column]}`} className='rounded-circle' height={40} width={40} /> : column === "createdAt" || column === "updatedAt" ? moment(rowData[column]).format('DD-MM-YYYY') + " "+ moment(rowData[column]).format('HH:mm') : rowData[column]}</td>)
                  }
                }
                )}
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEdit(rowData._id)}
                  >
                    Edit
                  </button>   <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(rowData._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : <tr> <td colSpan={header?.length} className='pt-3 text-center'><p>No Data Found</p></td></tr>}
          </>
        </tbody>
      </table>
      <DeleteModal
        deleteModal={deleteModal}
        deleteId={deleteId}
        setDeleteModal={setDeleteModal}
        endpoints={endpoints}
      />
    </div>
  )
}

export default CommonPageTables