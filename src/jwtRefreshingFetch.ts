const jwtRefreshingFetch = async (input: RequestInfo, init?: RequestInit) => {
  let response = await fetch(input, init);
  if (!response.ok) {
    const respJson = await response.clone().json();
    if (
      response.status === 401 &&
      respJson.detail === "Authentication credentials were not provided."
    ) {
      console.log("MUST REFRESH");

      await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/token/refresh/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "*/*",
            "content-type": "application/json",
          },
          body: JSON.stringify({}), //Empty body needed for django token handling in middleware
        }
      );
      response = await fetch(input, init);
    }
  }
  return response;
};

export default jwtRefreshingFetch;
