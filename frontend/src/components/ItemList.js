import React from 'react';
import { Button, Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
const ItemList = ({ item }) => {
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
          <Button>Add to Cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
