import {CampProject} from './camp-project.model';

export interface CampProjectRepository {
  save(campProject: CampProject): Promise<void>

  findAll(): Promise<CampProject[]>

  findById(id: string): Promise<CampProject | undefined>

  deleteById(id: string): Promise<CampProject | undefined>
}

export class InMemoryCampProjectRepository implements CampProjectRepository {

  private readonly projects: { [id: string]: CampProject };

  private constructor(campProjects: { [p: string]: CampProject }) {
    this.projects = campProjects;
  }

  static empty(): InMemoryCampProjectRepository {
    return new InMemoryCampProjectRepository({});
  }

  static withData(projects: CampProject[]): InMemoryCampProjectRepository {
    const repository = InMemoryCampProjectRepository.empty()
    projects.forEach(project => repository.save(project))
    return repository;
  }

  findAll(): Promise<CampProject[]> {
    return Promise.resolve(Object.keys(this.projects).map(key => this.projects[key]) ?? []);
  }

  findById(id: string): Promise<CampProject | undefined> {
    return Promise.resolve(this.projects[id]);
  }

  save(campProject: CampProject): Promise<void> {
    this.projects[campProject.id] = campProject;
    return Promise.resolve();
  }

  deleteById(id: string): Promise<CampProject | undefined> {
    const projectToDelete = this.projects[id]
    if (projectToDelete) {
      delete this.projects[id]
      return Promise.resolve(projectToDelete);
    }
    return Promise.resolve(undefined)
  }

}
