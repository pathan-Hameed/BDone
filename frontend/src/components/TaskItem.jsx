import { FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TaskItem({ task }) {
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
      className={`
        relative
        bg-white
        p-6
        rounded-2xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        group
        overflow-hidden
      `}
    >
      {/* Subtle Gradient Accent Top */}
      <div
        className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${style.accent}`}
      />

      {/* Hover Icons */}
      <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
        <FiCheck className="text-gray-400 hover:text-green-500 cursor-pointer transition" />
        <FiEdit2 className="text-gray-400 hover:text-blue-500 cursor-pointer transition" />
        <FiTrash2 className="text-gray-400 hover:text-red-500 cursor-pointer transition" />
      </div>

      {/* Title + Priority Dot */}
      <div className="flex items-center gap-3 mt-3">
        <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />

        <h3 className="text-lg font-semibold text-gray-800 relative inline-block truncate">
          {task.title}
          <span className="absolute left-0 -bottom-1 w-1/2 h-[2px] bg-gray-900/70 group-hover:w-full transition-all duration-300"></span>
        </h3>
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-500 text-sm leading-relaxed">
        {task.description}
      </p>
    </div>
  );
}