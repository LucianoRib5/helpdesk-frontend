import { Controller, useForm } from "react-hook-form";
import { CustomBox, CustomInput, CustomText } from "../../components";
import { useCallback, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUsers, updateUser } from "../../store/slices/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import UserCard from "../../components/UserCard";
import { Button } from "@mui/material";
import CreateUserModal from "../../components/CreateUserModal";
import { UserStatusEnum, type UserBasicInfo } from "../../features/user/userTypes";

interface UserFilterForm {
  name: string;
}

const ManageUsers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserBasicInfo | null>(null);
  const { users } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, watch } = useForm<UserFilterForm>();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback((data: UserFilterForm) => {
    UserService.getUserByUserName(data.name).then((response) => {
      dispatch(setUsers(response.data));
    }).catch((error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: 'colored',
        }
      )
    });
  }, []);

  const { name } = watch();
  
  useEffect(() => {
    if (!name) {
      dispatch(setUsers([]));
      return;
    }
    const subscription = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 300);

    return () => clearTimeout(subscription);
  }, [name]);

  const changeStatus = useCallback((userId: number, status: string) => {
    UserService.updateUserStatus(userId, status).then((response) => {
      toast.success('Status do usuário atualizado com sucesso!', {
        autoClose: 2000,
      });
      dispatch(updateUser(response.data));
    }).catch((error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: 'colored',
        }
      );
    });
  },[dispatch]);
  
  return (
    <CustomBox>
      <CustomBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <CustomText variant='h5' fontWeight='bold' gutterBottom>
          Usuários
        </CustomText>
        <Button
          type='submit'
          variant='outlined'
          sx={{
            height: 40,
            px: 4,
            color: 'black',
            fontWeight: 600,
          }}
          onClick={() => setShowModal(true)}
        >
          CRIAR USUÁRIO
        </Button>
      </CustomBox>
      <CustomBox>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Nome do usuário"
              placeholder="Pesquisar usuários..."
              fullWidth
              sx={{ minWidth: 500, maxWidth: 500 }}
            />
          )}
        />
      </CustomBox>
      <CustomBox
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {users.length > 0 && (
          users.map((user) => (
            <UserCard
              user={user}
              role='teste'
              changeStatus={() => changeStatus(user.userId, user.status === UserStatusEnum.ACTIVE ? UserStatusEnum.INACTIVE : UserStatusEnum.ACTIVE)}
              onEdit={() => { 
                setUserToEdit(user) 
                setShowModal(true)
              }}
            />
          ))
        )}
      </CustomBox>
      <CreateUserModal
        open={showModal}
        onClose={() => setShowModal(false)}
        userToEdit={userToEdit}
        setUserToEdit={setUserToEdit}
      />
    </CustomBox>
  )
}

export default ManageUsers;