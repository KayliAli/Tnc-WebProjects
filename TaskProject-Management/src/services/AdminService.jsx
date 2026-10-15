import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_USERS } from '../constants/mockData';

/** @typedef {import('../interfaces/Project').Project} Project */
/** @typedef {import('../interfaces/Project').ProjectInput} ProjectInput */
/** @typedef {import('../interfaces/User').User} User */
/** @typedef {import('../interfaces/Task').Task} Task */

/** Yönetici ekranının proje verilerini localStorage üzerinden yönetir. */
export const useAdminService = () => {
	/** @type {Project[]} */
	const [projects, setProjects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
	/** @type {User[]} */
	const [users] = useLocalStorage('app_users', INITIAL_USERS);
	/** @type {Task[]} */
	const [, setTasks] = useLocalStorage('app_tasks', INITIAL_TASKS);

	/** @param {ProjectInput} projectData */
	const createProject = (projectData) => {
		const project = {
			id: Date.now(),
			proje_adi: projectData.proje_adi.trim(),
			aciklama: projectData.aciklama.trim(),
			durum: projectData.durum,
			ekip_uyeleri: projectData.ekip_uyeleri,
			olusturan_id: projectData.olusturan_id,
			davet_kodu: crypto.randomUUID(),
		};

		setProjects((currentProjects) => [project, ...currentProjects]);
		return project;
	};

	/** @param {number} projectId @param {ProjectInput} projectData */
	const updateProject = (projectId, projectData) => {
		setProjects((currentProjects) => currentProjects.map((project) => (
			project.id === projectId
				? {
						...project,
						proje_adi: projectData.proje_adi.trim(),
						aciklama: projectData.aciklama.trim(),
						durum: projectData.durum,
						ekip_uyeleri: projectData.ekip_uyeleri,
						davet_kodu: project.davet_kodu || crypto.randomUUID(),
					}
				: project
		)));
	};

	/** @param {number} projectId */
	const deleteProject = (projectId) => {
		setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId));
		setTasks((currentTasks) => currentTasks.filter((task) => task.proje_id !== projectId));
	};

	return { projects, users, createProject, updateProject, deleteProject };
};
