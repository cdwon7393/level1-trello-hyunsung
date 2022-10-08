import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import List_templet from '../src/List_templet'

export type TaskType = {
  id: number; 
  title: string;
  description: string;
}

type ContextProps = {
  tasks: TaskType[][],
  addTask(sectionIndex: number, newTask: TaskType): void,
  deleteTask(sectionIndex: number, newTask: TaskType): void,
  updateTask(sectionIndex: number, newTask: TaskType, updateTitle: string, updateDescription: string): void,
  moveRightTask(sectionIndex: number, newTask: TaskType): void,
  moveLeftTask(sectionIndex: number, newTask: TaskType): void,
  moveUpTask(sectionIndex: number, task: TaskType): void,
  moveDownTask(sectionIndex: number, task: TaskType): void,
}

export const TrelloContext = React.createContext<ContextProps>({
  tasks: [],
} as any);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<TaskType[][]>([
    [],
    [],
    [],
  ]);

  const addTask = (sectionIndex: number, newTask: TaskType) => {
    setTasks(prev => {
      return [
        ...prev.slice(0, sectionIndex),
        [newTask, ...prev[sectionIndex]],
        ...prev.slice(sectionIndex + 1),
      ]
    });
  };
  const deleteTask = (sectionIndex: number, task: TaskType) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, idx),
          ...prev[sectionIndex].slice(idx + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    });
  };
  const updateTask = (sectionIndex: number, task: TaskType, updateTitle: string, updateDescription: string) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, idx),
          {
            id: prev[sectionIndex][idx].id,
            title: updateTitle,
            description: updateDescription,
          },
          ...prev[sectionIndex].slice(idx + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    })
  };

  const moveRightTask = (sectionIndex: number, task: TaskType) => {
    if (sectionIndex === tasks.length - 1) return;
    deleteTask(sectionIndex, task);
    addTask(sectionIndex + 1, task);
  };
  const moveLeftTask = (sectionIndex: number, task: TaskType) => {
    if (sectionIndex === 0) return;
    deleteTask(sectionIndex, task);
    addTask(sectionIndex - 1, task);
  };
  const moveUpTask = (sectionIndex: number, task:TaskType) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      if (idx === 0) return prev;
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, idx-1),
          prev[sectionIndex][idx], prev[sectionIndex][idx-1],
          ...prev[sectionIndex].slice(idx + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    })
  };
  const moveDownTask = (sectionIndex: number, task:TaskType) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      if (idx === tasks[sectionIndex].length-1) return prev;
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, idx),
          prev[sectionIndex][idx+1], prev[sectionIndex][idx],
          ...prev[sectionIndex].slice(idx + 2),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    })
  };

  return (
    <TrelloContext.Provider value={{ tasks, addTask, deleteTask, updateTask, moveUpTask, moveDownTask, moveRightTask, moveLeftTask,}}>
    <Box display="flex" justifyContent="space-between" p={4}>
      <List_templet title="To Do" index = {0} />
      <Box w={4} />
      <List_templet title="Doing" index = {1}/>
      <Box w={4} />
      <List_templet title="Done" index = {2}/>
    </Box>
    </TrelloContext.Provider>
  )
}

export default Home
