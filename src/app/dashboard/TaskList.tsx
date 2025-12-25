"use client";

import { useState, useOptimistic } from "react";
import { addTask, toggleTask } from "@/lib/actions";
import { Check, Plus, Loader2 } from "lucide-react";
import { clsx } from "clsx";

type Task = {
    id: number;
    title: string;
    isCompleted: boolean | null;
    createdAt: Date | null;
    userId: number | null;
};

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
    const [tasks, setOptimisticTasks] = useOptimistic(
        initialTasks,
        (state, newTask: Task) => [newTask, ...state]
    );
    const [isPending, setIsPending] = useState(false);

    async function handleAddTask(formData: FormData) {
        setIsPending(true);
        const title = formData.get("title") as string;

        // Optimistic update (simulated ID)
        setOptimisticTasks({
            id: Math.random(),
            title,
            isCompleted: false,
            userId: 1,
            createdAt: new Date(),
        });

        await addTask(formData);
        setIsPending(false);
    }

    return (
        <div>
            <form action={handleAddTask} className="flex gap-2 mb-6">
                <input
                    name="title"
                    type="text"
                    placeholder="Add a new task..."
                    required
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                    disabled={isPending}
                    type="submit"
                    className="bg-primary text-white p-2 rounded-lg hover:bg-primary-600 transition flex items-center justify-center min-w-[44px]"
                >
                    {isPending ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                </button>
            </form>

            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={clsx(
                            "flex items-center p-3 rounded-lg border transition duration-200",
                            task.isCompleted
                                ? "bg-gray-50 border-gray-100 opacity-70"
                                : "bg-white border-gray-200 hover:border-primary/30"
                        )}
                    >
                        <button
                            onClick={async () => {
                                // Optimistic toggle could be implemented here too, but simple state toggle is also fine for MVP
                                await toggleTask(task.id, !task.isCompleted);
                            }}
                            className={clsx(
                                "w-6 h-6 rounded-md border flex items-center justify-center mr-3 transition",
                                task.isCompleted
                                    ? "bg-primary border-primary text-white"
                                    : "border-gray-300 hover:border-primary"
                            )}
                        >
                            {task.isCompleted && <Check size={14} />}
                        </button>
                        <span
                            className={clsx(
                                "text-gray-700",
                                task.isCompleted && "line-through text-gray-400"
                            )}
                        >
                            {task.title}
                        </span>
                    </li>
                ))}
                {tasks.length === 0 && (
                    <li className="text-center text-gray-400 py-4">No tasks for today. Add one above!</li>
                )}
            </ul>
        </div>
    );
}
