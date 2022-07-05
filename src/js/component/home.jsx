import { stringify } from "query-string";
import React,{useState,useEffect} from "react";

//create your first component

function NewTask({createTask}) {
    return (
        <input type="text" className="focus"
            placeholder={"Escribe una tarea"}
            onKeyPress={createTask}/>
    )
}
	
	const Home = () => {
		const api='https://assets.breatheco.de/apis/fake/todos/user/jmbr';
		const [task, setTask] = useState([]);
		const [counter, setCounter] = useState(0);
	
		function createTask(e) {
			if (e.key === "Enter" && e.target.value != "") {
				setTask([
					...task,{'label':
					e.target.value,'done':false}
				]);
				e.target.value = "";
				setCounter(counter + 1)
			}
		}
	
		useEffect(() => {
			
				fetch(api, 
					{method: 'GET',
					body: JSON.stringify(task),
					headers: {'Content-Type': 'application/json'}}).then(response => response.json()).then(info => info).catch(error => error)
			
		},[task]);
		
		useEffect(() => {
				fetch(api, 
					{method: 'PUT',
					body: JSON.stringify(task),
					headers: {'Content-Type': 'application/json'}}).then(response => response.json()).then(info => info).catch(error => error)
			
		},[task]);
		const deleteUser = () => {
			fetch(api, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'}}).then(response => response.json()).then(info => info).catch(error => error)
		}

		const newUser = () => {
			fetch(api, {
				method: 'POST',
				body: JSON.stringify([]),
				headers: {'Content-Type': 'application/json'}}).then(response => response.json()).then(info => info).catch(error => error)
		}
	
		return (
			<div>
				<h1 className="todo-header">To do List</h1>
				<div id="mainContainer">
					<NewTask createTask={createTask}></NewTask>
					<ul>{
						task.map((tarea, index) => {
							return (
								<li key={index}>
									{tarea.label}
									<span className="fa fa-trash"
										onClick={
											() => (task.splice(index, 1), setCounter(counter - 1))
									}></span>
								</li>
							)
						})
					} </ul>
					<div>
						<h5>{
							task.length == 0 ? "No task to do" : `${counter} task left`
						}</h5>
					</div>
				</div>
				<div id="h2"></div>
				<div id="h3"></div>
				<div id="btnDiv">
					<button id="delUser" onClick={()=>{deleteUser()}}>Delete USER
					</button>
					<button id="newUser" onClick={()=>{newUser()}}>Create USER
					</button>
				</div>
			</div>
		);
};


export default Home;
