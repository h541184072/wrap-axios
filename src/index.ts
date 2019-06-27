import { create } from './create';

const $http = create();
$http.create = create;
export default $http;
