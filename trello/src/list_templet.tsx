import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { type } from "os";
import { BsTrashFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill} from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { NextSeo } from "next-seo";
import { useContext, useState } from "react";
import { TaskType, TrelloContext } from "../pages";


export default function List_templet({ title: listTitle, index: index}: 
  { title: string, index: number }) {

  const { isOpen: addModalIsOpen, onClose: onAddModalClose, onOpen: onAddModalOpen } = useDisclosure();
  const { isOpen: updateModalIsOpen, onClose: onUpdateModalClose, onOpen: onUpdateModalOpen } = useDisclosure();

  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { tasks: templetes, addTask, deleteTask, updateTask, moveDownTask, moveLeftTask, moveRightTask, moveUpTask} = useContext(TrelloContext);
  const tasks = templetes[index];

  const addTask2 = () => {
    addTask(index, {
      id: Date.now(),
      title: title,
      description: description,
    });
    setTitle('');
    setDescription('');
    onAddModalClose();
  };
  const deleteTask2 = (task: TaskType) => {
    deleteTask(index, task);
  }
  const updateTask2 = (updateTitle: string, updateDescription: string) => {
    const idx = tasks.findIndex(t => t.id === currentId);
    updateTask(index, tasks[idx], updateTitle, updateDescription);    
  };
  const moveDownTask2 = (task: TaskType) => {
    moveDownTask(index, task);
  };
  const moveUpTask2 = (task: TaskType) => {
    moveUpTask(index, task);
  };
  const moveRightTask2 = (task: TaskType) => {
    moveRightTask(index, task);
  };
  const moveLeftTask2 = (task: TaskType) => {
    moveLeftTask(index, task);
  };

  return (
    <>
    <NextSeo
      title="hs trello"
      openGraph={{
        title: 'hs trello',
        description: 'this is hs trello',
        images: [
          {url : 'https://www.hide-city.com/_asset/img/biography/photo.jpg'}
        ]
      }}
      />
    <Box bg="tomato" flex={1} borderRadius={4} p={4}>
      <Heading>{listTitle}</Heading>

      <Button onClick={()=>onAddModalOpen()} >할일 추가</Button>

      <Stack>
        {tasks.map((task) => (
          
          <Box display = 'flex' justifyContent='space-between' key={task.id} bg="cyan.200" p={4} borderRadius={4}>
            <Box>
              <Heading fontSize="md">{task.title}</Heading>
              <Text>{task.description}</Text>
              <Button onClick={() => deleteTask2(task)}><BsTrashFill/></Button>
              <Button onClick={() => {
                onUpdateModalOpen();
                setTitle(task.title);
                setDescription(task.description);
                setCurrentId(task.id);
              }}>
                수정
              </Button>
            </Box>
            <Box display="flex" verticalAlign='middle'>

              <Box display="flex" flexDirection="column" justifyContent="space-evenly">
              <BsFillArrowLeftSquareFill  onClick={() => moveLeftTask2(task)}/>
              </Box>

              <Box display="flex" flexDirection="column" justifyContent='space-evenly'>
                <BsFillArrowUpSquareFill onClick={() => moveUpTask2(task)}/>
                <BsFillArrowDownSquareFill onClick={() => moveDownTask2(task)}/>
              </Box>
              
              <Box display="flex" flexDirection="column" justifyContent="space-evenly">
              <BsFillArrowRightSquareFill onClick={() => moveRightTask2(task)}/>
              </Box>

            </Box>
          </Box>
        ))}

      </Stack>

      <Modal isOpen={addModalIsOpen} onClose={onAddModalClose}>
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => addTask2()}>Add</Button>
            <Button variant="text" onClick={onAddModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={updateModalIsOpen} onClose={onUpdateModalClose}>
        <ModalContent>
          <ModalHeader>카드 수정</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => updateTask2(title, description)}>수정하기</Button>
            <Button variant="text" onClick={onUpdateModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </>
  )
}