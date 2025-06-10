import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { UserStatusEnum, type UserBasicInfo } from "../features/user/userTypes";

interface UserCardProps {
  user: UserBasicInfo;
  role: string;
  onEdit: () => void;
  changeStatus: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  role, 
  onEdit, 
  changeStatus
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        width: 250,
        height: 120,
        backgroundColor: "#fff",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {user.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {role}
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
            }}
            onClick={onEdit}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
            }}
            onClick={changeStatus}
          >
            {user.status === UserStatusEnum.ACTIVE ? 'Desativar' : 'Ativar'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCard;
