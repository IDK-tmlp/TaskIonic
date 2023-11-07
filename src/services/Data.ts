import { PostTask, Task, UpdatedTask } from "../interfaces/taskInterfaces";

export default class Data {
  static url = "http://localhost:3000/tasks";
  static async loadData():Promise<Task[]> {
    return fetch(Data.url)
      .then((response) => {
        //console.log('Response : ', response);
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error dans loadData : ", error);
      });
  }
  static async addTask(data: PostTask) {
    return fetch(Data.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(function (res) {
        // console.log(res);
        return res.json();
      })
      .then(function (data) {
        console.log(data);
		return data
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  static async deleteTask(id: number) {
    fetch(Data.url+"/" + id, {
      method: "DELETE",
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  static async updateTask(id: number, data:UpdatedTask) {
    fetch(Data.url+"/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then(function (res) {
        // console.log(res);
		return res.json();
      })
	  .then(function (data) {
        console.log(data);
      })
      .catch(function (res) {
        console.log(res);
      });
  }
}