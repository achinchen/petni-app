import path from 'node:path';
import dotenv from 'dotenv';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
});
