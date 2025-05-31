import { CustomBox } from "../../components";
import { NewTicketForm } from "../../components/NewTicketForm";
import { useAppSelector } from "../../hooks/useAppSelector";

const Home: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <CustomBox sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {user && (
                <NewTicketForm user={user}/>
            )}
        </CustomBox>
    );
}

export default Home;
