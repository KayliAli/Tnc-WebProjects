import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS } from '../constants/mockData';
import { Login } from './Login';

/** @typedef {import('../interfaces/User').User} User */
/** @typedef {import('../interfaces/Project').Project} Project */

/** @param {{ user: User | null, onLogin: (user: User) => void }} props */
export const InviteRoute = ({ user, onLogin }) => {
  const { inviteToken } = useParams();
  /** @type {[Project[], (value: Project[] | ((projects: Project[]) => Project[])) => void]} */
  const [projects, setProjects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  const project = projects.find((item) => item.davet_kodu === inviteToken);
  const isMember = project?.ekip_uyeleri?.some((memberId) => Number(memberId) === Number(user?.id));

  useEffect(() => {
    if (!user || !project || isMember) return;

    setProjects((currentProjects) => currentProjects.map((currentProject) => (
      currentProject.id === project.id
        ? { ...currentProject, ekip_uyeleri: [...(currentProject.ekip_uyeleri || []), user.id] }
        : currentProject
    )));
  }, [user, project, isMember, setProjects]);

  if (!user) return <Login onLogin={onLogin} />;
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="mb-2 text-xl font-bold text-slate-800">Davet bağlantısı geçersiz</h1>
        <p className="mb-5 text-sm text-slate-500">Proje yöneticisinden yeni bir bağlantı isteyin.</p>
        <Link to="/dashboard" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Çalışma Alanıma Dön</Link>
      </div>
    );
  }
  if (!isMember) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">Davet kabul ediliyor...</div>;
  }

  return <Navigate to="/dashboard" replace />;
};
