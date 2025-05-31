import { useQuery } from "@tanstack/react-query";
import { CustomBox } from "../../components";
import { NewTicketForm } from "../../components/NewTicketForm";
import { UserTypeEnum } from "../../features/user/userTypes";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { setCustomers } from "../../store/slices/customerSlice";
import CustomerService from "../../services/CustomerService";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['customers'],
        queryFn: () => CustomerService.getAllCustomers(),
        enabled: user?.userType !== UserTypeEnum.CUSTOMER,
    });

    useEffect(() => {
        if (data && !isLoading && !isError) {
            dispatch(setCustomers(data));
        }
    }, [dispatch]);

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
