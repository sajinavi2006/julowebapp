import * as axios from 'services/axios';

const POST = jest.spyOn(axios, 'POST');
const PATCH = jest.spyOn(axios, 'PATCH');
const PUT = jest.spyOn(axios, 'PUT');
const GET = jest.spyOn(axios, 'GET');

export { POST, PATCH, PUT, GET };
