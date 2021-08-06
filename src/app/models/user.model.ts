export class User {
  private token: any;
  private roles:string[];

  constructor(ss: any, roles:string[]) {
    this.token=ss;
    this.roles=roles;
  }

  get userToken() :any{
    return this.token;
  }

}
