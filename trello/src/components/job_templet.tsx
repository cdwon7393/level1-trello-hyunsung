import { Box, Button, Heading} from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "../../pages";


export default function Job_component({ job, onDelete }: { job: Task, onDelete: () => void }) {

    return (
        <Box display='flex' flexDirection='row'>
            <Box margin={3}>
                {job.description}
            </Box>
            <Button onClick={onDelete}>
                Delete
            </Button>

        </Box>
    )
}


