// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  xrApiUrl: 'http://localhost:8082/api/xr',
  xrsApiUrl: 'http://localhost:8081/api/xrs',
  snodeApiUrl: 'http://localhost:8084/api/servicenode',
  blocknetWalletApiUrl:'http://localhost:8085/api/blocknet',
  ccSpvApiUrl:'https://localhost:8088/api/'
};
