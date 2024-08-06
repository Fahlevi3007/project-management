import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjextSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState]= useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[],
  });
  function handleAddTask(text){
    setProjectState(prevState => {
      const taskId = Math.random()
      const newTask ={
        text:text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };
      return{
        ...prevState,
        tasks:[newTask,...prevState.tasks,]
      }
    })
  }
  function handleDelete(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task)=> task.id !== id)
      }
    })
  }
  function handleStartAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:null,
      }
    });
  }
  function handleSelectProject(id){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:id,
      }
    });
  }
  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
      }
    });
  }
  function handleAddProject(projectData){
    setProjectState(prevState => {
      const projectId = Math.random()
      const newProject ={
        ...projectData,
        id: projectId
      };
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }
  function handleDeleteProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId)
      }
    });
  }
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content = <SelectedProject project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask} 
  onDeleteTask={handleDelete} 
  tasks={projectState.tasks} 
  selectedProjectId={projectState.selectedProjectId}
  />;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjextSelected onStartAddProject={handleStartAddProject} />
  }
  return (
    < main className="h-screen my-8 flex gap-8">
    <ProjectSidebar onStartAddProject={handleStartAddProject}  projects={projectState.projects} onSelectProject={handleSelectProject} />
    {content}
    </main>
  );
}

export default App;
