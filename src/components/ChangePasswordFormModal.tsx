import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { passwordSchema, type PasswordSchemaType } from "../schemas/password.schema";
import { useAppSelector } from "../hooks/useAppSelector";
import type { UpdatePasswordPayload } from "../features/user/userTypes";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ChangePasswordFormModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordFormModal = ({
  open,
  onClose,
}: ChangePasswordFormModalProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
  });

  const closeModal = () => {
    reset();
    clearErrors();
    onClose();
  }

  const updatePassword = async (data: PasswordSchemaType) => {
    if (!user?.userId) return;

    const payload: UpdatePasswordPayload = {
      userId: user?.userId,
      currentPassword: data.currentPassword,
        newPassword: data.newPassword,
    }

    UserService.updatePassword(payload).then(() => {
      navigate('/login', { replace: true });
      closeModal();
    }).catch((error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message || 'Erro ao atualizar dados',
        {
          autoClose: 3000,
          theme: 'colored',
        }
      );
    });
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: 2, p: 2 } }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <DialogTitle sx={{ p: 0, fontWeight: 700, fontSize: "1.2rem" }}>
          Alterar Senha
        </DialogTitle>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="form">
        <Stack spacing={2}>
          <TextField
            placeholder="Insira sua senha atual"
            type="password"
            {...register("currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            fullWidth
            size="small"
          />
          <TextField
            placeholder="Insira sua nova senha"
            type="password"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            fullWidth
            size="small"
          />
          <TextField
            placeholder="Confirme a nova senha"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            size="small"
          />

          <Button
            variant='outlined'
            type='button'
            onClick={handleSubmit(updatePassword)}
            sx={{ borderRadius: '12px', px: 4, mt: 4 }}
          >
            Confirmar
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ChangePasswordFormModal;
