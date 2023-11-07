export interface PostTask {
	title:string,
	done:boolean,
}

export interface Task extends PostTask{
	id:number,
}

export interface UpdatedTask {
	title?:string,
	done?:boolean,
}