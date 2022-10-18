import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Table } from 'antd';

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: 'SHOW_LOADING' });
        const { data } = await axios.get('/api/items/get-item');
        setItemsData(data);
        console.log(data);
        dispatch({ type: 'HIDE_LOADING' });
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  //table data;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },

    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <DeleteOutlined style={{ cursor: 'pointer' }} />
          <EditOutlined style={{ cursor: 'pointer' }} />
        </div>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary">Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />;
    </DefaultLayout>
  );
};

export default ItemPage;
