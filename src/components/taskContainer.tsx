import { Task } from "../interfaces/taskInterfaces";
import { BiSolidCheckCircle, BiTrash, BiSolidPencil } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { IonItem, IonLabel } from "@ionic/react";

interface TaskContainerprops {
	task: Task,
	onTaskDone: () => void,
	onTaskDelete: () => void,
}

const TaskContainer = (props : TaskContainerprops) => {

	return (
		<IonItem >
			<IonLabel className="ion-text-wrap" style={props.task.done? {textDecorationLine:"line-through"} : {}}>{props.task.title}</IonLabel>
				{props.task.done ?
					<GiCancel onClick={props.onTaskDone} color="red" size={40} role="button"/> :
					<BiSolidCheckCircle color="green" size={40} onClick={props.onTaskDone} role="button"/>
				}
				<BiSolidPencil onClick={()=>alert("Edit")} color="grey" size={40} role="button"/>
				<BiTrash onClick={props.onTaskDelete} color="red" size={40} role="button"/>
		</IonItem>
	);
}

export default TaskContainer;