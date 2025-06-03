import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setTickets } from "../../store/slices/ticketSlice";
import { UserTypeEnum } from "../../features/user/userTypes";
import { isCustomer } from "../../utils/roles";
import { CustomBox, LastTickets, NewTicketForm } from "../../components";
import TicketService from "../../services/TicketService";

const Home: React.FC = () => {
    const { auth, customer } = useAppSelector((state) => state);
    const { user } = auth;

    const dispatch = useAppDispatch();

    const { data, isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
        if (!user) return Promise.resolve([]);

        if (isCustomer(user.userType)) {
            const customerId = customer.currentCustomer?.id;
            if (!customerId) return Promise.resolve([]);
            const customerTickets = await TicketService.getTicketsByCustomerId(customerId);
            return customerTickets;
        }

        const allTickets = await TicketService.getAllTickets();
        return allTickets;
    },
    enabled: !!user && (user.userType !== UserTypeEnum.CUSTOMER || !!customer.currentCustomer?.id),
    });


    useEffect(() => {
        if (data && !isLoading && !isError) {
            dispatch(setTickets(data));
        }
    }, [data, isLoading, isError, dispatch]);

    return (
        <CustomBox sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {user && (
                <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                    <NewTicketForm user={user}/>
                    <LastTickets />
                </CustomBox>    
            )}
        </CustomBox>
    );
}

export default Home;
