// import { useTrackerStore } from './tracker';
// import { usePointStore } from './point';

// export { useTrackerStore, usePointStore };



import { TSTType } from "@fzt/tst-domain";

import { create } from "zustand";

export type AppState = {
    data: TSTType;
    commit: (next: TSTType) => void;
    // loadProjects: () => Promise<void>;
};

export type AppStore = AppState;

export const useAppStore = create<AppStore>()((set, get) => ({
    data: {
        currentScore: 0,
        regionsById: {},
    } as TSTType,

    commit: (next: TSTType) =>
        set((state: AppState) => ({
            data: next,
        })),

    // questa è una funzione di prova per mostrare come il dominio fa il suo lavoro.
    // In un caso reale, bisogna creare un oggetto nel database a partire da un Partial<ProjectType>,
    // prendere l'id e quindi aggiornare il dominio

    // loadProjects: async () => {
    //     set((state) => ({ loading: true }));

    //     const { data, commit } = get();

    //     try {
    //         const snap = await getDocs(collection(db, "projects"));
    //         const projects = Object.fromEntries(
    //             snap.docs.map((d) => [d.id, { id: d.id, tasksById: {}, ...d.data() }]),
    //         );
    //         console.log('loadProjects here says', projects)

    //         // deve caricare anche le task e distribuirle nei vari progetti!!!
    //         const tasksSnap = await getDocs(collection(db, "tasks"))
    //         const tasks = tasksSnap.docs.map((d) => ({ ...d.data() }));

    //         for (const task of tasks) {
    //             const projectId = task.projectId;
    //             delete task.projectId;

    //             if (projects[projectId]) {
    //                 projects[projectId].tasksById[task.id] = task;
    //             }
    //         }


    //         commit({
    //             ...data,
    //             projectsById: projects as MapOfProjectsType,
    //         });
    //         set((state) => ({ loading: false }));

    //     } catch (error: unknown) {
    //         //   if (error instanceof DomainError) {
    //         //     toast.error(mapDomainError(error));
    //         //   } else {
    //         //     toast.error('Errore imprevisto');
    //         console.error(error);
    //         //   }
    //     }
    // },

    /* addProject: async (project: Partial<ProjectType>) => {
      // al momento arrivano solo questi dati,
      // non arriva la dueDate per esempio, perché è un campo che
      // l'utente compila in un secondo momento, quando modifica il progetto.
      const projectWithoutTasks = {
        name: project.name,
        description: project.description || "",
        createdAt: new Date(),
      }
      const docRef = await addDoc(collection(db, "projects"), projectWithoutTasks);
  
      // non ci sono tasks in un progetto appena creato
  
      project.id = docRef.id;
      project.tasksById = {};
  
      const { data, commit } = get();
      const next = Todos.addProject(data, project);
      commit(next);
    }, */
}));