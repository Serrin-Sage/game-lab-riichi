import { Profile } from "../lib/types";

type HomePageProps = { profile: Profile };

export const HomePage = ({ profile }: HomePageProps) => (
  <div className="profile-welcome content-wrap" id="top">
    <p className="eyebrow">Active profile</p>
    <h1>
      Welcome, <em>{profile.name}</em>.
    </h1>
    <p className="lede">Choose a profile above to view its score overview.</p>
  </div>
);
