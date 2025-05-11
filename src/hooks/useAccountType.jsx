import React from "react";
function useAccountType() {
  const [acType, setAcType] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("current-user"));
      let accountType = null;
      if (user) accountType = user.accountType;
      else accountType = null;
      setAcType(accountType);
    })();
  }, []);

  return { acType };
}

export default useAccountType;
