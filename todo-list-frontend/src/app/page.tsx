import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3x1 font-bold text-center my-6">To-Do List PWA</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}
