export class User {
  constructor(
    private token: string,
    private roles:string[]
  ) {}

  get userToken() {
    return this.token;
  }

}
