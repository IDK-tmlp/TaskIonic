import { Task } from "../interfaces/taskInterfaces";

export const switchTask = (task:Task, taskList:Task[], directionUp:boolean) => {
    const taskIndex = taskList.indexOf(task);
    // Trick to deep clone a nestedArray
	let copyTaskList:Task[] = JSON.parse(JSON.stringify(taskList));
    copyTaskList = taskList.map((tache, index) => {tache.order = index+1; return tache});

    if (directionUp) {
        copyTaskList[taskIndex-1].order ++;
        copyTaskList[taskIndex].order--;
    }
    else {
		copyTaskList[taskIndex+1].order--;
		copyTaskList[taskIndex].order++;
    }
    return copyTaskList.sort((a, b) => a.order - b.order);
}