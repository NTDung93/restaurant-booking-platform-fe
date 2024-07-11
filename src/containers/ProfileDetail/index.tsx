import { useParams } from 'react-router-dom';

export default function ProfileDetail() {
  const params = useParams<{ profileId: string }>();
  console.log(params);

  return (
    <>
      <h1>Profile detail {params.profileId}</h1>
    </>
  );
}
