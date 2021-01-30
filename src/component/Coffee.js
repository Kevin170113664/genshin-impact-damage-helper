import React, {useState} from 'react';
import {Image, Modal} from 'antd';
import alipay from '../asset/alipay.jpg'
import wechat from '../asset/wechat.jpg'
import './Coffee.css';

function Coffee() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="coffee">
      <a onClick={showModal}>☕️</a>
      <Modal title="请作者喝杯咖啡！" visible={isModalVisible} footer={null} onCancel={handleClose}>
        <Image src={alipay}/>
        <Image src={wechat}/>
      </Modal>
    </div>
  );
}

export default Coffee;
