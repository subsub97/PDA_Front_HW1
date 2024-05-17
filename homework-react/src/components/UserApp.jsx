import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function UserApp() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("http://jsonplaceholder.typicode.com/users");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패', error);
      }
    }
    getUser();
  },[]);

  return (
    <div>
      <h1>Users</h1>
      {UserListGroup(user)}
    </div>
  )
}

function UserListGroup(user) {
  return (
    <ListGroup>
      {user.map((userInfo, index) => (
        <ListGroup.Item key={index}>{`${index+1}.${userInfo.name} - ${userInfo.email}`}</ListGroup.Item>
      ))}

    </ListGroup>
  );
}

