import React, { useState } from "react";
import { Input, notification, Form, Button, List, Card,Row,Col,Spin } from "antd";
import { getML } from "../../api/compara";


import './compara.scss'
const { Meta } = Card;

export default function Compara() {
  const [articulos, setArticulos] = useState(null);
  const [mostrar, setMostrar] = useState(false);

  const onFinish = (values) => {
    setMostrar(true);
    getML(values).then((response) => {
      if (!response.ok) {
        notification["error"]({
          message: response.message,
        });
      } else {
        
        setArticulos(response.mercado);
        setMostrar(false);
      }
    });
  };

  return (
    <div className='container-compara'>
     <div className="titulo-crud">
        <Row justify="center">
          <Col>
            <div>
              <p>
                <a href="/compara">Scraping Mercado libre</a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    <Row justify='center' style={{padding:10}}>
      <Col>
        <Form name="customized_form_controls" layout="inline" onFinish={onFinish}>
          <Form.Item name="buscar">
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Buscar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
      

      <Lista articulos={articulos} mostrar={mostrar}/>
    </div>
  );
}

function Lista(props) {
  const data = props.articulos;
  const mostrar = props.mostrar;
  

  if (data) {
    return (
      <>
        <List
          grid={{
            gutter: 4,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <Card
                style={{ width: 284 }}
                cover={
                  <img
                    alt="example"
                    src={item.imgUrl}
                    style={{ height: 254 }}
                  />
                }
              >
                <Meta title={item.title} description={`$${item.price}`} />
              </Card>
            </List.Item>
          )}
        />
      </>
    );
  }

  return (
    <>
      <Row justify="center">
          <Col style={{paddingTop:50}}>
            <Spin  size="large" style={{ visibility: mostrar ? "visible" : "hidden" }} />
          </Col>
        </Row>

    </>
  )
}
