import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';

const UserWidget = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <>
      {user && (
      <>
        <span style={{padding:'15px', fontSize:'18px', fontWeight:600}}>Oi, {user.displayName}</span>
        <button onClick={logout}>Sair</button>
      </>
    )}</>
  );
};

export default UserWidget;
