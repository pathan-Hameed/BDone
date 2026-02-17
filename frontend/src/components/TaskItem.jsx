import { FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TaskItem({ task, onComplete, onEdit, onDelete }) {
  const date = new Date(task.dueDate).toISOString().split("T")[0];

  const priorityStyles = {
    Low: {
      accent: "from-emerald-400/40 to-transparent",
      glow: "hover:shadow-emerald-100",
      dot: "bg-emerald-400",
    },
    Medium: {
      accent: "from-amber-400/40 to-transparent",
      glow: "hover:shadow-amber-100",
      dot: "bg-amber-400",
    },
    High: {
      accent: "from-red-500/50 to-transparent",
      glow: "hover:shadow-rose-200",
      dot: "bg-red-500",
    },
  };

  const style = priorityStyles[task.priority] || priorityStyles.Low;

  return (
    <div
      className="
    relative
    p-6
    rounded-2xl
    backdrop-blur-md
    bg-white/50
    shadow-md
    hover:shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    group
    overflow-hidden
  "
      style={{
        backgroundImage: "url('/cardbg3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      {/* Accent Bar */}
      <div
        className={`absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r ${style.accent}`}
      />

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Hover Icons */}
        <div
          className="
    absolute 
    top-0 
    right-0 
    flex 
    gap-3 

    opacity-100
    md:opacity-0 
    md:group-hover:opacity-100 

    transition 
    duration-300
  "
        >
          <FiCheck
            className="text-gray-400 md:hover:text-green-500 md:hover:scale-110 cursor-pointer transition"
            onClick={() => onComplete(task)}
          />
          <FiEdit2
            className="text-gray-400 md:hover:text-blue-500 md:hover:scale-110 cursor-pointer transition"
            onClick={() => onEdit(task)}
          />
          <FiTrash2
            className="text-gray-400 md:hover:text-red-500 md:hover:scale-110 cursor-pointer transition"
            onClick={() => onDelete(task)}
          />
        </div>

        {/* Title + Priority + Description */}
        <div className="flex items-start gap-3 mt-2">
          <span className={`mt-2 w-2.5 h-2.5 rounded-full ${style.dot}`} />

          <div className="flex-1 truncate">
            <h3
              className={`text-lg font-semibold transition-all duration-300
          ${
            task.isCompleted
              ? "line-through text-gray-400"
              : "text-gray-900 group-hover:text-blue-600"
          }`}
            >
              {task.title}
            </h3>

            <p
              className={`mt-2 text-sm leading-relaxed truncate w-full 
          ${task.isCompleted ? "line-through text-gray-400" : "text-gray-600"}`}
            >
              {task.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/60">
          <p className="text-xs font-medium text-gray-500 tracking-wide">
            {date}
          </p>

          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold text-white shadow-sm
        ${task.category === "Daily" ? "bg-blue-500" : "bg-emerald-500"}`}
          >
            {task.category === "Daily" ? "D" : "T"}
          </div>
        </div>
      </div>
    </div>
  );
}
