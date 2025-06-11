
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
import { emailSchema, type EmailSchemaType } from "../schemas/email.schema";
import UserService from "../services/UserService";
import type { UpdateEmailPayload } from "../features/user/userTypes";
import { useAppSelector } from "../hooks/useAppSelector";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ChangeEmailFormModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangeEmailFormModal = ({
  open,
  onClose,
}: ChangeEmailFormModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
  });

  const navigate = useNavigate();

  const closeModal = () => {
    reset();
    clearErrors();
    onClose();
  }

  const updateEmail = async (data: EmailSchemaType) => {
    if (!user?.userId) return;

    const payload: UpdateEmailPayload = {
      userId: user?.userId,
      newEmail: data.email,
      password: data.password,
    }

    UserService.updateEmail(payload).then(() => {
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
          Alterar E-mail
        </DialogTitle>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="form">
        <Stack spacing={2}>
          <TextField
            placeholder="Insira o novo e-mail"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            size="small"
          />
          <TextField
            placeholder="Confirme o novo e-mail"
            {...register("confirmEmail")}
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message}
            fullWidth
            size="small"
          />
          <TextField
            placeholder="Insira sua senha"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            size="small"
          />

          <Button
            variant='outlined'
            type='button'
            onClick={handleSubmit(updateEmail)}
            sx={{ borderRadius: '12px', px: 4, mt: 4 }}
          >
            Confirmar
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ChangeEmailFormModal;
