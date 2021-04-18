import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, notification, Table,Popconfirm } from "antd";
import {
  postRegistroApi,
  getVisitasApi,
  deleteVisitaApi,
} from "../../api/crud";
import { DeleteOutlined } from "@ant-design/icons";

import "./crud.scss";

export default function Crud() {
  const [inputs, setInputs] = useState({
    nombre: "",
    edad: "",
    pais: "",
    comentarios: "",
  });
  const [visitas, setVisitas] = useState(null);
  const [ok, setOk] = useState(null);

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = () => {
    const { nombre, edad, pais } = inputs;
    if (!nombre || !edad || !pais) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      postRegistroApi(inputs).then((response) => {
        if (!response.ok) {
          notification["error"]({
            message: response.message,
          });
        } else {
          notification["success"]({
            message: response.message,
          });
          resetForm();

          setOk(response);
        }
      });
    }
  };

  const resetForm = () => {
    setInputs({
      nombre: "",
      edad: "",
      pais: "",
      comentarios: "",
    });
  };

  useEffect(() => {
    getVisitasApi()
      .then((response) => {
        if (!response.ok) {
          notification["warning"]({
            message: "no se pudo conectar a la base de datos",
          });
        } else {
          setVisitas(response.result.visita);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  }, [ok]);

  const seleccion = (item) => {
    if (window.confirm("¿Seguro que desea borrar la visita?")) {
    deleteVisitaApi(item._id)
    .then((response) => {
      
      setOk(response);
    })
    .catch(() => {
      notification["error"]({
        message: "Error del servidor.",
      });
    });
  }
    
  };
  
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Edad",
      dataIndex: "edad",
      key: "edad",
    },
    {
      title: "Pais",
      dataIndex: "pais",
      key: "pais",
    },
    {
      title: "Comentarios",
      dataIndex: "comentarios",
      key: "comentarios",
    },
    {
      title: "Action",
      key: "operation",
      render: (item) => (
         
          <Button type="danger" onClick={() => seleccion(item)}>
            <DeleteOutlined/>
          </Button>
       
        
      ),
    },
  ];

  

  return (
    <div className="container-crud">
      <div className="titulo-crud">
        <Row justify="center">
          <Col>
            <div>
              <p>
                <a href="/crud">Registro de visitas</a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={12} offset={6}>
          <div className="lightSpeedIn">
            <Form
              name="visitas"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onChange={changeForm}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu nombre!",
                  },
                ]}
              >
                <Input
                  placeholder="Nombre"
                  name="nombre"
                  value={inputs.nombre}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu edad!",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Edad"
                  name="edad"
                  value={inputs.edad}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu pais!",
                  },
                ]}
              >
                <Input placeholder="País" name="pais" value={inputs.pais} />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  placeholder="Comentarios de mi web"
                  name="comentarios"
                  value={inputs.comentarios}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Guardar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={24}>
          <ListaVisitas visitas={visitas} columns={columns} />
        </Col>
      </Row>
    </div>
  );
}

function ListaVisitas(props) {
  const visita = props.visitas;
  if (visita) {
    return (
      <>
        <Table
          dataSource={visita}
          columns={props.columns}
          pagination={{ pageSize: 5 }}
          size="small"
          // style={{ visibility: mostrar ? "visible" : "hidden" }}
        />
      </>
    );
  }

  return null;
}
