import React from "react";
function useAuth() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const _user = JSON.parse(localStorage.getItem("current-user"));
      if (_user) setUser(_user);
    })();
  }, []);

  return { user };
}

export default useAuth;
