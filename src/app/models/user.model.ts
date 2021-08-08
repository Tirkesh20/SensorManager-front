export class User {
  private token: any;
  roles:string[];
  isAdmin:boolean;

  constructor(ss: any, roles:string[],isAdmin:boolean) {
    this.token=ss;
    this.roles=roles;
    this.isAdmin = roles.includes("ROLE_ADMIN");
    this.isAdmin=isAdmin;
  }

  get userToken() :any{
    return this.token;
  }


}
