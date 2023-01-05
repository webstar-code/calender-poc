import React from "react";
import * as Realm from "realm-web";
import Data from "./Data";


const app = new Realm.App({ id: "application-0-ypktq" });

const Mongodb = () => {
  const [user, setUser] = React.useState<Realm.User | null>(app.currentUser);

  return (
    <div className="App">
      <div className="App-header">
        {user ?
          <>
            <UserDetail user={user} />
            <Data app={app} />
          </>
          :
          <>
            <Login setUser={setUser} />
          </>

        }
      </div>
    </div>
  )
}

// Create a component that displays the given user's details
const UserDetail = ({ user }: { user: Realm.User }) => {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
};



type LoginProps = {
  setUser: (user: Realm.User) => void;
};
const Login = ({ setUser }: LoginProps) => {
  const loginAnonymous = async () => {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};



export default Mongodb;