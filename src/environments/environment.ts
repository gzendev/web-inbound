export const environment = {
  production: false,
  sistemaId: '70',
  frontEndBaseUrl: '/webv2',

  // Conexion a Jboss Test -------------------------------------
  commonApiUrl: 'https://test.gefco.com.ar/framework/v2/api',
  webv2ApiUrl: 'https://test.gefco.com.ar/webv2Service/api',
  
  accountsServiceURL: 'http://authorization.test.gefco.com.ar',
  // webv2ApiUrl: 'http://190.55.137.20:8091/webv2Service/api',

  // Conexion a Tomcat Local -------------------------------------
  // frontEndBaseUrl: '',
  // commonApiUrl: 'http://localhost:8090/framework/v2/api',
  // webv2ApiUrl: 'http://localhost:8091/webv2Service/api',
  ambiente: 'local'
};

import 'zone.js/dist/zone-error';
