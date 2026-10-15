import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '../constants/mockData';
import { normalizeTaskStatus } from '../utils/taskStatus';

/** @typedef {import('../interfaces/Project').Project} Project */
/** @typedef {import('../interfaces/Task').Task} Task */
/** @typedef {import('../interfaces/Task').TaskStatusValue} TaskStatusValue */
/** @typedef {import('../interfaces/User').User} User */

/** @param {Task} task */
const getAssignedUserId = (task) => task.calisan_id ?? task.atanan_kullanici_id;

/** @param {User | null} user */
export const useEmployeeService = (user) => {
	/** @type {Project[]} */
	const [projects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
	/** @type {Task[]} */
	const [allTasks, setAllTasks] = useLocalStorage('app_tasks', INITIAL_TASKS);
	const userId = Number(user?.id);

	const myProjects = projects.filter((project) => (
		(project.ekip_uyeleri || []).some((memberId) => Number(memberId) === userId)
	));

	const myProjectIds = new Set(myProjects.map((project) => Number(project.id)));
	const myTasks = allTasks
		.filter((task) => Number(getAssignedUserId(task)) === userId && myProjectIds.has(Number(task.proje_id)))
		.map((task) => ({ ...task, durum: normalizeTaskStatus(task.durum) }));

	/** @param {number} taskId @param {TaskStatusValue} newStatus */
	const changeTaskStatus = (taskId, newStatus) => {
		setAllTasks((currentTasks) => currentTasks.map((task) => (
			task.id === taskId && Number(getAssignedUserId(task)) === userId
				? { ...task, durum: normalizeTaskStatus(newStatus) }
				: task
		)));
	};

	return { myProjects, myTasks, changeTaskStatus };
};
