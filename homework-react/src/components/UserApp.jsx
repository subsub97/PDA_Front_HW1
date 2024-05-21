import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function UserApp() {

  const [user, setUser] = useState([]);
  // Todos,Posts useState 만들기
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [post, setPost] = useState([]);
  const [curPost, setCurPost] = useState([]);
  const [todo, setTodo] = useState([]);
  const [curTodo, setCurTodo] = useState([]);
  
  const handleItemClick = (item) => {
    setSelectedItem(item) // 선택된 아이템 정보 설정
    const filteredPosts = post.filter(postInfo => postInfo.userId === item.id)
    setCurPost(filteredPosts)
    const filteredTodos = todo.filter(todoInfo => todoInfo.userId === item.id)
    setCurTodo(filteredTodos)
    setShowModal(true) // 모달 표시
  }


  const handleClose = () => setShowModal(false)

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

  useEffect(() => {
    async function getTodos() {
        try {
          const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
          setTodo(response.data);
          
        } catch (error) {
          console.error('데이터를 불러오는 데 실패', error);
        }
    }
    getTodos();
  },[]);

   useEffect(() => {
    async function getPosts() {
        try {
          const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
          setPost(response.data);
          
        } catch (error) {
          console.error('데이터를 불러오는 데 실패', error);
        }
    }
    getPosts();
  },[]); 

  return (
    <div>
      <h1>Users</h1>
      <Container>
      <ListGroup>
        {user.map((userInfo, index) => (
          <ListGroup.Item 
            action
            key={index}
            onClick={() => handleItemClick(userInfo)}
          >{`${index+1}.${userInfo.name} - ${userInfo.email}`}</ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h2>Posts</h2>
              {curPost.map((postInfo, index) => (
                <li key={index}>{postInfo.title}</li>
              ))}
            </Col>
            <Col>
              <h2>Todos</h2>
              {curTodo.map((todoInfo, index) => (
                <li key={index}>{todoInfo.title}</li>
              ))}
            </Col>
          </Row>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  )
}




