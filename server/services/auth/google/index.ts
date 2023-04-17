import 'dotenv/config';
import { GoogleStrategy, PROVIDER_NAME } from './index.strategy';

import { UserUseCase } from 'server/usecases/user';
import { UserRepositoryPostgres } from 'server/gateways/user/postgres';
import { UserController } from 'server/adapters/user/index.controller';
import { UserPresenter } from 'server/adapters/user/index.presenter';
export { PROVIDER_NAME };

const userRepository = new UserRepositoryPostgres();
const userUseCase = new UserUseCase(userRepository);
const userPresenter = new UserPresenter();
const userController = new UserController(userUseCase, userPresenter);

export default function getGoogleStrategy() {
  return new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH0_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH0_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/api/auth/google/callback'
    },
    async ({ profile }) => {
      const { displayName: name, emails, photos } = profile;
      const email = emails[0].value;
      const imageUrl = photos[0].value;

      const payload = {
        name,
        email,
        imageUrl
      };

      const user = userController.upsert(payload);

      return user;
    }
  );
}
