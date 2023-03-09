import 'dotenv/config';
import upsertUser from '~/models/User/upsertUser/index.server';
import { GoogleStrategy, PROVIDER_NAME } from './google.strategy.server';
export { PROVIDER_NAME };

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

      const user = {
        name,
        email,
        imageUrl
      };

      return upsertUser(user);
    }
  );
}
