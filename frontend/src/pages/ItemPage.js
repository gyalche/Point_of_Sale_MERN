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
import { Button, Table, Modal, Form, Select, message } from 'antd';

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={deleteItemHandler(record)}
          />
          <EditOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setEditItem(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  //useeffect;
  // useEffect(() => {
  //   getAllItems();
  // }, []);

  //form submit;
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({ type: 'SHOW_LOADING' });
        const res = await axios.post('/api/items/add-item', value);
        message.success('Item Added Successfully!');
        getAllItems();
        setPopModal(false);
        dispatch({ type: 'HIDE_LOADING' });
      } catch (error) {
        message.error('Something wennt wrong');
        console.log(error);
      }
    } else {
      try {
        dispatch({ type: 'SHOW_LOADING' });
        await axios.put('/api/items/edit-item', {
          ...value,
          itemId: editItem._id,
        });
        message.success('Item Updated Successfully!');
        getAllItems();
        setPopModal(false);
        dispatch({ type: 'HIDE_LOADING' });
      } catch (error) {
        message.error('Something wennt wrong');
        console.log(error);
      }
    }
  };
  const deleteItemHandler = async (record) => {
    try {
      await axios.delete('/api/items/delete-item', { itemId: record._id });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'HIDE_LOADING' });
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />;
      {popModal && (
        <Modal
          title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
          open={popModal}
          onCancel={() => {
            setEditItem(null);
            setPopModal(false);
          }}
          footer={false}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editItem}>
            <Form.Item name="name" label="Name">
              <input style={{ width: '100%', outline: 'none' }} />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <input style={{ width: '100%', outline: 'none' }} />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <input style={{ width: '100%', outline: 'none' }} />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodels</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
