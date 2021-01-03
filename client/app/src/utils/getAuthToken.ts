// Note: this code extends '@auth0/auth0-react.js' which is built
// on '@auth0/auth0-spa-js' which exports 'createAuth0Client'.
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  GetTokenSilentlyOptions,
} from "@auth0/auth0-spa-js";

let _initOptions: Auth0ClientOptions = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN
    ? process.env.REACT_APP_AUTH0_DOMAIN
    : "",
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID
    ? process.env.REACT_APP_AUTH0_CLIENT_ID
    : ""
};

let _client: Auth0Client;

const getAuth0Client = () => {
  return new Promise(async (resolve, reject) => {
    let client;
    if (!client) {
      try {
        client = await createAuth0Client(_initOptions);
        resolve(client);
      } catch (e) {
        reject(new Error("getAuth0Client Error"));
      }
    }
  });
};

export const getApiToken = async (options?: GetTokenSilentlyOptions) => {
  if (!_client) {
    _client = (await getAuth0Client()) as Auth0Client;
  }
  return (await _client.getTokenSilently(options)) as string;
};
