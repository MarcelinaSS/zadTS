export class CampProject {

  readonly id: string;
  readonly mentor: string;
  readonly gitRepositoryUrl: string;

  constructor(
      props: {
        readonly id: string,
        readonly mentor: string,
        readonly gitRepositoryUrl: string
      }
  ) {
    this.id = props.id;
    this.mentor = props.mentor;
    this.gitRepositoryUrl = props.gitRepositoryUrl;
  }

}
