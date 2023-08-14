import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export const config = {
  githubApi: {
    accessToken: process.env.GITHUB_TOKEN,
  },
};
