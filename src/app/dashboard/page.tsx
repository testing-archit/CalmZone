import { getTasks, getMoods } from "@/lib/actions";
import TaskList from "./TaskList";
import MoodOverview from "./MoodOverview";
import { Smile, CheckSquare, Clock } from "lucide-react";

export default async function DashboardPage() {
    const tasks = await getTasks();
    const moods = await getMoods();

    return (
        <div className="container mx-auto px-6 py-8">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
                <p className="text-gray-600">Here's your wellness overview for today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-primary-100 text-primary mr-4">
                        <Smile size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{moods.length}</div>
                        <div className="text-sm text-gray-500">Mood Logs (Last 7 days)</div>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-secondary-100 text-secondary mr-4">
                        <CheckSquare size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.isCompleted).length}</div>
                        <div className="text-sm text-gray-500">Tasks Completed</div>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                        <Clock size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">5h</div>
                        <div className="text-sm text-gray-500">Meditation Time (Mock)</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mood Section */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Mood Trends</h2>
                    <MoodOverview moods={moods} />
                </section>

                {/* Tasks Section */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Daily Tasks</h2>
                    <TaskList initialTasks={tasks} />
                </section>
            </div>
        </div>
    );
}
