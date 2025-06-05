import { Link, List, ListItem, ListItemText } from '@mui/material';
import { CustomBox, CustomPaper, CustomText } from '../components';
import { useAppSelector } from '../hooks/useAppSelector';
import { Link as LinkRouter} from "react-router-dom";

const LastTickets: React.FC = () => {
  const { tickets } = useAppSelector((state) => state.ticket);

  const orderedLastTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <CustomPaper
      elevation={1}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 800,
        boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <CustomText variant='h6' fontWeight='bold' gutterBottom>
        Últimos chamados abertos
      </CustomText>
      {
        orderedLastTickets.length > 0 && (
          <CustomText variant='body2' color='text.secondary' gutterBottom>
            Confira seus três últimos chamados abertos, você pode acessa-los a qualquer momento!
          </CustomText>
        )
      }
      <CustomBox>
        <List disablePadding>
          {
            orderedLastTickets.length > 0 ? (
              orderedLastTickets.map((ticket) => (
                <ListItem key={ticket.id} disableGutters disablePadding>
                  <ListItemText
                  primary={
                    <Link component={LinkRouter} to={`/ticket/${ticket.id}/details`}>
                      {`#${String(ticket.id).padStart(3, '0')} - ${ticket.title}`}
                    </Link>
                  }
                  />
                </ListItem>
              ))
            ) :
            (
              <CustomText variant='body2' color='text.secondary'>
                Você ainda não possui chamados abertos.
              </CustomText>
            )
          }
        </List>
      </CustomBox>
    </CustomPaper>
  );
};

export default LastTickets;
