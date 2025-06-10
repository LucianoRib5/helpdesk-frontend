import { Controller, useForm } from "react-hook-form";
import { CustomBox, CustomInput, CustomText } from "../../components";
import { useCallback, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUsers } from "../../store/slices/authSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import UserCard from "../../components/UserCard";
import { Button } from "@mui/material";
import CreateUserModal from "../../components/CreateUserModal";

interface UserFilterForm {
  name: string;
}

const ManageUsers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
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
              name={user.name}
              role='teste'
              onDeactivate={() => console.log('Deactivate', user.id)}
              onEdit={() => console.log('Edit', user.id)}
            />
          ))
        )}
      </CustomBox>
      <CreateUserModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </CustomBox>
  )
}

export default ManageUsers;