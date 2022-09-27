import { Box, Button, Heading} from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "../../pages";
import Job_component from "./job_templet";


export default function List_component({task}: { task: Task}) {

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
            setJob([...job.slice(0, i), ...job.slice(i+1)]);
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
                    ADD
                </Button>
                
            </Box>
            {job.map(jobs)}
        </Box>
        </>
    )
}



