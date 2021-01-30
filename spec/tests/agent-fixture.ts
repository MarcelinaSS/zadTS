import {CampProject} from '../../src/camp-projects/camp-project.model';
import supertest from 'supertest';
import expressApp from '../../src/Server';
import campProjectRouter from '../../src/camp-projects/camp-project.router';
import {InMemoryCampProjectRepository} from '../../src/camp-projects/camp-project.repository';

export function campProjectsSupertestAgent(testData: CampProject[] = []): supertest.SuperAgentTest{
  return supertest.agent(expressApp([
    {route: '/camp-projects', router: campProjectRouter(InMemoryCampProjectRepository.withData(testData))}
  ]));
}
