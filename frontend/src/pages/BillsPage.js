import DefaultLayout from '../components/DefaultLayout';
import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
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
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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
          <EyeOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedBill(record);
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />;
      {popModal && (
        <Modal
          title="Invoice details"
          open={popModal}
          onCancel={() => {
            setPopModal(false);
          }}
          footer={false}>
          <div className="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Techinfo YT POS</h2>
                <p>Contact: 12345 | Kathmandu, gokarna</p>
              </div>
            </center>
            <div className="mid">
              <div className="mt-2">
                <p>
                  Customer Name: <b>{selectedBill?.customerName}</b>
                  Phone No: <b>{selectedBill?.customerNumber}</b>
                  <br />
                  Date:<b>{selectedBill?.data.toString().substring(0, 10)}</b>
                  <br />
                  <hr style={{ margin: '5px' }} />
                </p>
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill?.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item?.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item?.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item?.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item?.quantity * item?.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
