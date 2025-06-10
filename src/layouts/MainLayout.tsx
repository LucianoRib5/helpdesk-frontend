import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { isAdmin } from '../utils/roles';
import { 
  CustomBox, 
  CustomText, 
  NavListItem, 
  CustomToolbar, 
  CustomAppBar,
  CustomList,
  CustomDrawer
} from '../components';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logout } from '../store/slices/authSlice';
import { resetState } from '../store/slices/actions/resetActions';

const MainLayout = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleMenuOptions = () => {
    const isAdminUser = isAdmin(user?.userType);

    const menuOptions = [
      { text: 'Home', path: '/dashboard', visible: true },
      { text: 'Ver chamados', path: '/dashboard/tickets', visible: true },
      { text: 'Gerenciar usuários', path: '/manage-users', visible: isAdminUser },
      { text: 'Relatórios', path: '/tickets/reports', visible: isAdminUser },
      { text: 'Configurações da conta', path: '/account-settings', visible: true },
    ]

    return menuOptions.filter(option => option.visible).map((option) => (
      <NavListItem
        text={option.text}
        key={option.text}
        onClick={() => navigate(option.path)}
      />
    ));
  }

  return (
    <CustomBox sx={{ display: 'flex' }}>
      <CustomAppBar>
        <CustomToolbar 
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0', 
          }}
        >
          <CustomText variant='h6' noWrap>
            Dashboard
          </CustomText>
          <CustomText variant='body1'>Bem vindo(a), {user?.userName}!</CustomText>
        </CustomToolbar>
      </CustomAppBar>

      <CustomDrawer>
        <CustomToolbar />
        <CustomBox sx={{ overflow: 'auto', height: '100%' }}>
          <CustomList sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}>
            {handleMenuOptions()}
            <NavListItem
              sx={{
                border: 'none',
                backgroundColor: 'transparent',
                mt: 'auto',
              }}
              icon={<LogoutIcon />}
              text='Sair'
              onClick={() => { 
                navigate('/login')
                dispatch(logout())
                dispatch(resetState())  
              }}
            />
          </CustomList>
        </CustomBox>
      </CustomDrawer>

      <CustomBox
        component='main'
        sx={{ flexGrow: 1, bgcolor: '#f7f7f7', p: 3, minHeight: '100vh' }}
      >
        <CustomToolbar />
        <Outlet />
      </CustomBox>
    </CustomBox>
  );
};

export default MainLayout;
