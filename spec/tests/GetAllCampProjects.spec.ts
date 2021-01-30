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

describe('(0 punktów) | GET /api/camp-projects', () => {

  const campProjectsPath = '/api/camp-projects';
  const getAllCampProjectsPath = `${campProjectsPath}`;

  let agent: SuperTest<Test>;

  describe('Given: Some Camp Projects already saved', () => {

    beforeAll((done) => {
      agent = campProjectsSupertestAgent(testData)
      done();
    });

    describe('When: GET /api/camp-projects requested', () => {

      it('Then: Response should contains all previously saved Camp Projects', (done) => {

        agent.get(getAllCampProjectsPath)
            .end((err: Error, res: Response) => {
              logError(err);
              expect(res.status).toBe(StatusCodes.OK);
              const responseProjects = res.body.content.map((project: CampProject) => {
                return new CampProject(project);
              });
              const responseCount = res.body.count;
              expect(responseProjects).toEqual(testData);
              expect(responseCount).toEqual(testData.length);
              expect(res.body.error).toBeUndefined();
              done();
            });

      })

    })

  })

  describe('Given: None Camp Project already saved', () => {

    beforeAll((done) => {
      agent = campProjectsSupertestAgent([])
      done();
    });

    describe('When: GET /api/camp-projects requested', () => {

      it('Then: Response should contains no Camp Projects', (done) => {

        agent.get(getAllCampProjectsPath)
            .end((err: Error, res: Response) => {
              logError(err);
              expect(res.status).toBe(StatusCodes.OK);
              const responseProjects = res.body.content;
              const responseCount = res.body.count;
              expect(responseProjects).toEqual([]);
              expect(responseCount).toEqual(0);
              expect(res.body.error).toBeUndefined();
              done();
            });

      })

    })

  })

})
