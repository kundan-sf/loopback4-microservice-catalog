export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const OasKeyMap: {[key in HttpMethod]: string} = {
  [HttpMethod.GET]: 'get',
  [HttpMethod.POST]: 'post',
  [HttpMethod.PUT]: 'put',
  [HttpMethod.PATCH]: 'patch',
  [HttpMethod.DELETE]: 'delete',
};
