import {CampProject} from '../../src/camp-projects/camp-project.model';
import {Response, SuperTest, Test} from 'supertest';
import {campProjectsSupertestAgent} from './agent-fixture';
import {logError} from '../../src/shared/functions';
import {StatusCodes} from 'http-status-codes';

const testData = [
  new CampProject({
    id: 'ProjectId1',
    mentor: 'Jan Kowalski',
    gitRepositoryUrl: 'https://github.com/CodersCamp2020/CodersCamp2020.Projekt.JavaScript.StarWarsQuiz.git'
  }),
  new CampProject({
    id: 'ProjectId2',
    mentor: 'Kazimierz Nowak',
    gitRepositoryUrl: 'https://github.com/CodersCamp2020/CodersCamp2020.Zadanie.Backend-NestJS-DDD.Certification.git'
  }),
  new CampProject({
    id: 'ProjectId3',
    mentor: 'Janina Marek',
    gitRepositoryUrl: 'https://github.com/CodersCamp2020/CodersCamp2020.Zadanie.JavaScript.GenderFromPesel.git'
  }),
];

describe('(5 punktów) | DELETE /api/camp-projects/:id', () => {

  const campProjectsPath = '/api/camp-projects';
  const oneCampProjectsPath = (id: string) => `${campProjectsPath}/${id}`;

  let agent: SuperTest<Test>;

  beforeEach((done) => {
    agent = campProjectsSupertestAgent(testData)
    done();
  });

  describe('Given: Camp Project with id ProjectId1 already saved', () => {

    describe('When: DELETE /api/camp-projects/ProjectId1 requested', () => {

      it('Then: Response should have status 204 - No Content', (done) => {

        agent.delete(oneCampProjectsPath('ProjectId1'))
            .end((err: Error, res: Response) => {
              logError(err);
              expect(res.status).toBe(StatusCodes.NO_CONTENT);
              expect(res.body.error).toBeUndefined();
              done();
            });

      })


      it('Then: The project should be deleted', async (done) => {

        await agent.delete(oneCampProjectsPath('ProjectId1'));

        agent.get(oneCampProjectsPath('ProjectId1'))
            .end((err: Error, res: Response) => {
              logError(err);
              expect(res.status).toBe(StatusCodes.NOT_FOUND);
              expect(res.body.error).toBe('Cannot find project with id: ProjectId1');
              done();
            });
      })

    })

  })

})
