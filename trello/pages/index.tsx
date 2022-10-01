import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react'
import List_templet from '../src/List_templet'

export type TaskType = {
  type: number;
  id: number;
  title: string;
  description: string;
}

const Home: NextPage = () => {
  const [tasks0, setTasks0] = useState<TaskType[]>([]);
  const [tasks1, setTasks1] = useState<TaskType[]>([]);
  const [tasks2, setTasks2] = useState<TaskType[]>([]);
  return (
    <Box display="flex" justifyContent="space-between" p={4}>
      <List_templet src0 = {tasks0} src1 = {tasks1} src2 = {tasks2} title="To Do" type = {0} />
      <Box w={4} />
      <List_templet src0 = {tasks0} src1 = {tasks1} src2 = {tasks2}  title="Doing" type = {1}/>
      <Box w={4} />
      <List_templet src0 = {tasks0} src1 = {tasks1} src2 = {tasks2}  title="Done" type = {2}/>
    </Box>
  )
}

export default Home
