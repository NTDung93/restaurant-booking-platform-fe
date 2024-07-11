import { NavLink, Outlet } from 'react-router-dom';

export default function Profiles() {
  const profiles: number[] = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        {profiles.map((profileId) => (
          <NavLink
            key={profileId}
            to={`/profiles/${profileId}`}
            className={({ isActive }) => (isActive ? 'text-green-700' : '')}
          >
            Profile {profileId}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
