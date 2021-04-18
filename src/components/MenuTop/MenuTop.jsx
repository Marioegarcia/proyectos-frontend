import React, { useState } from "react";
import { Drawer, Button, Row, Col,  Image  } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import LOGO from '../../assets/img/logo1F.png'

import "./MenuTop.scss";

export default function MenuTop() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className='menu-top'>
    <div className="circular-menu  ">
    <Row align="middle">
      
      <Col span={8}>  
        <div className="circular-menu-left">
          <Button  type="primary" onClick={showDrawer} size="large">
            <MenuOutlined />
          </Button>
        </div>
      </Col>
      <Col span={8}> 
        <div className="logo">
          <Link to="/">
          <Image preview={false} src={LOGO} />
          </Link>
         
        </div>
      </Col>
      <Col span={8}></Col>
    </Row>

    </div>

      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={5}>
            <Link to="/" onClick={()=>setVisible(false)} >
              <div>HOME</div>
            </Link>
          </Col>
          <Col className="gutter-row" span={5}>
            <Link to="/clima"  onClick={()=>setVisible(false)} >
              <div>CLIMA</div>
            </Link>
          </Col>
          <Col className="gutter-row" span={5}>
            <Link to="/crud"  onClick={()=>setVisible(false)}>
              <div>CRUD</div>
            </Link>
          </Col>
          <Col className="gutter-row" span={5}>
            <Link to="/compara"  onClick={()=>setVisible(false)}>
              <div>Web Scraping</div>
            </Link>
          </Col>
          <Col className="gutter-row" span={4.8}>
            <Link to="/chat"  onClick={()=>setVisible(false)} >
              <div>CHAT</div>
            </Link>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}
