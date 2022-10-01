import { Box, Button, Heading, Modal} from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "../../pages";
import Job_component from "./job_templet";


export default function List_component({task}: { task: Task}) {

    const [isOpen, onclose, ]
    const [job, setJob] = useState([
        { id: 1, description: 'insert text1' },
        { id: 2, description: 'insert text2' }
    ]);
    
    const jobs = (task: Task) => (
        <Job_component
          key={task.id} 
          job={task}    
          onDelete={()=>{
            const i = job.findIndex((t) => t ===task);
            // task에 해당하는 것의 index를 찾아서 t로 한다. 그 t를 기준으로 양옆 잘라서 붙여준다. ===는 js에서 비교 연산할 때 사용하는 문법
            // job을 순회하면서 t(순회하는 index)를 넣어가면서 task와 같은 것을 찾으면 그 t를 i에 저장함.
            setJob([...job.slice(0, i), ...job.slice(i+1)]);
            // slice는 이상 미만
          }}
        />
    )

    return (
        <>
        <Box display="flex"
            flexDirection='column'
            justifyContent='start' 
            bg="cyan" 
            padding={4} 
            margin={3} 
            borderRadius={20}
            width={1200}
            height={800}
        >
            <Heading fontSize="l" bg='black' color='white' textAlign='center'>
                {task.description}
            </Heading>
            
            <Box display='flex' flexDirection="row" justifyContent="space-evenly" margin={10}>

                <Box>
                    ADD your job!
                </Box>

                <Button onClick={()=> setJob([...job,{id: Math.random(), description: 'insert text'}])}>
                    {/* onclick : 클릭할 때  { 내용 } 내용을 실천 
                    setjob 을 하면 job을 변경할 수 있다.
                    ...job : 기존에 있던 job 안에 있는 list component들 / ... : 비구조화 할당
                    
                    */}
                    ADD
                </Button>
                
            </Box>
            <Modal isOpen = {isOpen} onClose={onclose}>
                <input placeholder="title" />
                <input placeholder="description" />
            </Modal>
            {job.map(jobs)}
        </Box>
        </>
    )
}



