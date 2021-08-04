export class User {
  constructor(
    private token: string,
    private localId: string,
  ) {}

  get userToken() {
    return this.token;
  }
}
