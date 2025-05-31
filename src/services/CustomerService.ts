import type { Customer } from '../features/customer/customerTypes'
import ApiService from './ApiService'

const { get } = ApiService

const CustomerService = {
    getAllCustomers: async () => {
        return get<Customer[]>('/customers').then((response) => response.data)
    },
    getCustomerByUserId: async (userId: number) => {
        return get<Customer>(`/customers/user/${userId}`).then((response) => response.data)
    },
}

export default CustomerService