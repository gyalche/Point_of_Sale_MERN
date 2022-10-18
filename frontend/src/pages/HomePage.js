import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import ItemList from '../components/ItemList';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
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
  return (
    <>
      <DefaultLayout>
        <Row>
          {itemsData.map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item._id} item={item} />
            </Col>
          ))}
        </Row>
      </DefaultLayout>
    </>
  );
};

export default HomePage;
