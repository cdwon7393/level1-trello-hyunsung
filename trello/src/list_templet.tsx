import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { type } from "os";
import { TaskType } from "../pages"; 
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill} from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";


export default function List_templet(
  { src0, src1, src2, title: listTitle, type: listType}: 
  { src0: TaskType[], src1: TaskType[], src2: TaskType[], title: string, type: number }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: updateModalIsOpen, onClose: onUpdateModalClose, onOpen: onUpdateModalOpen } = useDisclosure();
  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [tasks0, setTasks0] = useState<TaskType[]>(src0);
  // const [tasks1, setTasks1] = useState<TaskType[]>(src1);
  // const [tasks2, setTasks2] = useState<TaskType[]>(src2);
  // const lists = {tasks0, tasks1, tasks2};
  const [tasks, setTasks] = useState<TaskType[]>([]);


  return (
    <Box bg="tomato" flex={1} borderRadius={4} p={4}>
      <Heading>{listTitle}</Heading>
      <Button onClick={() => {
  if (listType === 0){
    setTasks([...src0, ...tasks]);
  } else if (listType === 1){
    setTasks([...src1, ...tasks]);
  } else {
    setTasks([...src2, ...tasks]);
  }


        onOpen();
      }}>
        할일 추가
      </Button>
      <Stack>
        {tasks.map((task) => (
          
          <Box display = 'flex' justifyContent='space-between' key={task.id} bg="cyan.200" p={4} borderRadius={4}>
            <Box>
            <Heading fontSize="md">{task.title}</Heading>
            <Text>{task.description}</Text>
            <Button onClick={() => {
              const idx = tasks.findIndex(t => t.id === task.id);
              setTasks([
                ...tasks.slice(0, idx),
                ...tasks.slice(idx + 1),
              ])
            }}><BsTrashFill/></Button>
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
              <BsFillArrowLeftSquareFill onClick={() => {
                const idx = tasks.findIndex(t => t.id === task.id);
                }}/>
            <Box display="flex" flexDirection="column" justifyContent='space-evenly'>
              <BsFillArrowUpSquareFill
                onClick={() => {
                  const idx = tasks.findIndex(t => t.id === task.id);
                  if (idx !== 0) {
                    setTasks([
                      ...tasks.slice(0, idx-1),
                      tasks[idx], tasks[idx-1],
                      ...tasks.slice(idx + 1),
                    ])
              }}}/>
              <BsFillArrowDownSquareFill
                onClick={() => {
                  const idx = tasks.findIndex(t => t.id === task.id);
                  if (idx !== tasks.length-1) {
                    setTasks([
                      ...tasks.slice(0, idx),
                      tasks[idx+1], tasks[idx],
                      ...tasks.slice(idx + 2),
                    ])
              }}}/>
              </Box>
                <BsFillArrowRightSquareFill onClick={() => {

                }}/>
            </Box>
          </Box>
        ))}

      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>할일 추가</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              // 카드 추가
              setTasks([
                {
                  type: listType,
                  id: Date.now(),
                  title: title,
                  description,
                },                 
                ...tasks
              ]);
              // 입력값 초기화
              setTitle('');
              setDescription('');
              // 모달 닫기
              onClose();
            }}>추가하기</Button>
            <Button variant="text" onClick={onClose}>닫기</Button>
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
            <Button onClick={() => {
              const idx = tasks.findIndex(t => t.id === currentId);
              setTasks([
                ...tasks.slice(0, idx),
                {
                  type: listType,
                  id: currentId,
                  title,
                  description,
                },
                ...tasks.slice(idx + 1),
              ]);
              onUpdateModalClose();
            }}>수정하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}