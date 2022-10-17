import React from 'react';
import { Button, Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
const { Meta } = Card;
const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
  };
  return (
    <div>
      <Card
        style={{ width: 240, marginBottom: 20 }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ height: 200, objectFit: 'cover' }}
          />
        }
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
