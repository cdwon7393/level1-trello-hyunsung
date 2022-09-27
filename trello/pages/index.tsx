import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, AccordionProvider, Box, Button, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState } from 'react';
import List_component from '../src/components/three-images'

export type Task = {
  id: number;
  description: string;
}

const Home: NextPage = () => {

  const [data, setData] = useState([ 
    { id: 1, description: 'TODO' },
    { id: 2, description: 'DOING' },
    { id: 3, description: 'DONE' },
    { id: 4, description: 'BACKLOG' }
  ]);

  // 할일 목록 진행 전 진행 중 끝 => 3개 List / 추가, 삭제 

  const item2component = (task: Task) => (
    <List_component
      key={task.id}
      task={task}
    />
  )

  return (

    <Box display='flex' alignItems='stretch'>
      {data.map(item2component)}
    </Box>
  )
}

export default Home
