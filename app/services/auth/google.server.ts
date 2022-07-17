import type { User } from '@prisma/client';
import 'dotenv/config';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/services/session/index.server';
import { db } from '~/utils/db/index.server';
import { GoogleStrategy, PROVIDER_NAME } from './google.strategy.server';

const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH0_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH0_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/api/auth/google/callback'
    },
    async ({ profile }) => {
      const { displayName: name, emails, photos } = profile;
      const email = emails[0].value;
      const imageUrl = photos[0].value;

      const user = {
        name,
        email,
        imageUrl
      };

      console.log({ user });

      return db.user.upsert({
        create: user,
        update: user,
        where: { email }
      });
    }
  )
);

export { authenticator, PROVIDER_NAME };
