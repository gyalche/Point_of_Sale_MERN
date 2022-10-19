import DefaultLayout from '../components/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Table, Modal, Form, Select, message } from 'antd';
const BillsPage = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const { data } = await axios.get('/api/bills/get-bills');
      setBillsData(data);
      console.log(data);
      dispatch({ type: 'HIDE_LOADING' });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);

  //table data;
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    {
      title: 'Contact No',
      dataIndex: 'customerNumber',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subTotal',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'TAX',
      dataIndex: 'tax',
    },

    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EyeOutlined />
        </div>
      ),
    },
  ];
  //useeffect;
  // useEffect(() => {
  //   getAllItems();
  // }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />;
      {popModal && (
        <Modal
          title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
          open={popModal}
          onCancel={() => {
            setEditItem(null);
            setPopModal(false);
          }}
          footer={false}></Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
