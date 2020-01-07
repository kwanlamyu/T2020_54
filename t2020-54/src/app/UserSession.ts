export class UserSession {
  //constructor for application session

  static userId : string;
  static userName : string;

  static create(ID, userID, userName, userAuth) {
    UserSession.userId = userID;
    UserSession.userName = userName;
    return UserSession;
  };

  static createByObj(obj) {

    if(obj.hasOwnProperty('userID')){
      UserSession.userId = obj.userId;
    }
    if(obj.hasOwnProperty('userName')){
      UserSession.userName = obj.userName;
    }
    return UserSession;
  };

  static destroy() {
    UserSession.userId = null;
    UserSession.userName = null;
  };
}
