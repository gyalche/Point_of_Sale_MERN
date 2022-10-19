import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import ItemList from '../components/ItemList';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('drinks');
  const categories = [
    {
      name: 'drinks',
      imageUrl:
        'https://www.errenskitchen.com/wp-content/uploads/2020/11/manhattan-1-12.jpg',
    },
    {
      name: 'rice',
      imageUrl:
        'https://imgs.search.brave.com/SSY5C6oxG2H1mHl3-cjgC-CPnmHan9P8q-E3syGCIqI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/c2ltcGx5cmVjaXBl/cy5jb20vdGhtYi9q/X0laeExFUDJ0Smpv/bkNsM3M3UmlHbk11/eG89LzIwMDB4MTMz/MS9maWx0ZXJzOmZp/bGwoYXV0bywxKS9f/X29wdF9fYWJvdXRj/b21fX2NvZXVzX19y/ZXNvdXJjZXNfX2Nv/bnRlbnRfbWlncmF0/aW9uX19zaW1wbHlf/cmVjaXBlc19fdXBs/b2Fkc19fMjAyMF9f/MDJfX0hUQy1XaGl0/ZS1SaWNlLUxlYWQt/NC1lNTc0M2VlNGM2/M2E0MGEwYWVjMmYz/YWJkOWYxYzA5Ny5q/cGc',
    },
    {
      name: 'noodles',
      imageUrl:
        'http://www.jopreetskitchen.com/wp-content/uploads/2020/07/DSC_7156.jpg',
    },
  ];
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
        <div className="d-flex">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`d-flex category ${
                selectedCategory === category.name && 'category-active'
              }`}
              onClick={() => setSelectedCategory(category.name)}>
              <h4>{category.name}</h4>
              <img
                src={category.imageUrl}
                alt={category.name}
                height="40px"
                width="60px"
              />
            </div>
          ))}
        </div>
        <Row>
          {itemsData
            .filter((i) => i.category === selectedCategory)
            .map((item) => (
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
