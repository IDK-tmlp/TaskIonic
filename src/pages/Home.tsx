import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import TaskContainer from '../components/taskContainer';
import { Task, PostTask } from '../interfaces/taskInterfaces';
import Data from '../services/Data';
import './Home.css';

const Home: React.FC = () => {
	const [taskList, setTaskList] = useState<Task[]>([]);
	const inputRef = useRef<HTMLIonInputElement>(null);

	useEffect(()=>{
		//To launch jsonserver : json-server --watch db.json --port 3000
		//Fonction annonyme immédiate
		(async ()=>{
			const data: Task[] = await Data.loadData();
			setTaskList(data)
		})()
	}, [])
	
	const handleTaskDone = (taskId:number) => {
		const modifiedTaskList = taskList.map(task => {
			task.id === taskId && (task.done = !task.done);
			Data.updateTask(task.id, {done : task.done})
			return task;
		})
		setTaskList(taskList => modifiedTaskList);
	}
	const handleTaskDelete = (taskId:number) => {
		Data.deleteTask(taskId);
		const modifiedTaskList = taskList.filter(task => task.id !== taskId)
		setTaskList(taskList => modifiedTaskList)
	}
	const handleNewTask =  async (e:React.MouseEvent) => {
		e.preventDefault();
		if (inputRef.current) {
			const text:string = inputRef.current.value as string;
			const postTask : PostTask = {"title": text, done: false}
			const newTask: Task = await Data.addTask(postTask);
			const copyTaskList = [...taskList, newTask]
			setTaskList(copyTaskList);
			inputRef.current.value = "";
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>TaskList</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Taslist</IonTitle>
					</IonToolbar>
				</IonHeader>
				<div style={{margin:"2%"}} >
					<IonItem>
						<IonInput label="Tache :" placeholder="nom de votre tâche" id='taskTitle' ref={inputRef} name='taskTitle' clearInput={true}></IonInput>
						<IonButton type="submit" onClick={(e)=>handleNewTask(e)} color="primary">Ajouter</IonButton>
					</IonItem>
					<IonTitle>Listes de taches</IonTitle>
					<IonList>
						{taskList.map((task:Task) =>  <TaskContainer key={task.id} task={task} onTaskDone={() => handleTaskDone(task.id)} onTaskDelete={() => handleTaskDelete(task.id)} />)}
					</IonList>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
