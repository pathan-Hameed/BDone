import CompletedTasks from "./cards/CompletedTasks";
import TotalTasks from "./cards/TotalTasks";

function AllCards({ tasks }) {

  
  // about all tasks
  const totalTasks = tasks.length;
  const totalCompletedTasks = tasks.filter(
    (t) => t.isCompleted
  ).length;
  
  //about daily tasks
  const dailyTasks = tasks.filter((t) => t.category === "Daily").length;
  const CompletedTasksDaily = tasks.filter((t) => t.category === "Daily" && t.isCompleted).length;
  
  //about todays tasks
  const todayTasks = tasks.filter((t) => t.category === "Today").length;
  const CompletedTasksTodays = tasks.filter((t) => t.category === "Today" && t.isCompleted).length;

  return (
    <div className="flex flex-col md:grid  md:grid-cols-2 items-center justify-around gap-4 mx-8 md:mx-24 mb-12">
      <TotalTasks
        title="TOTAL TASKS"
        number={totalTasks}
        description="total number of tasks created"
      />
      <CompletedTasks
        title="TOTAL COMPLETED TASKS"
        number={totalCompletedTasks}
        description="total number of tasks completed"
      />

      {/* DAILY TASKS  */}
      <TotalTasks
        title="DAILY TASKS"
        number={dailyTasks}
        description="daily tasks created in total"
      />
      <CompletedTasks
        title="DAILY COMPLETED TASKS"
        number={CompletedTasksDaily}
        description="daiy tasks which are completed"
      />

      {/* TODAY'S TASKS  */}
      <TotalTasks
        title="TODAY'S TOTAL TASKS"
        number={todayTasks}
        description="total number of tasks created today"
      />
      <CompletedTasks
        title="TODAY'S TASKS COMPLETED"
        number={CompletedTasksTodays}
        description="total number of today's tasks completed"
      />
    </div>
  );
}

export default AllCards;