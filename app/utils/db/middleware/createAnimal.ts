import type { Prisma } from '@prisma/client';

const FOUNDING_YEAR = 1911;

const getCodeSuffix = () => {
  const datetime = new Date();
  const year = datetime.getFullYear() - FOUNDING_YEAR;
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  const hour = datetime.getHours();
  const minutes = datetime.getMinutes();
  const seconds = datetime.getSeconds();

  return `${year}${month}${date}${hour}${minutes}${seconds}`;
};

const AnimalCodeMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.action !== 'create') return next(params);
  if (params.model !== 'Animal') return next(params);
  if (params.args.data.id) return next(params);

  params.args.data.code = `PETNI${getCodeSuffix()}`;
  return next(params);
};

export default AnimalCodeMiddleware;
