import type { Technician } from '../features/technician/technician'
import ApiService from './ApiService'

const { get } = ApiService

const TechnicianService = {
    getTechnicianByUserId: async (userId: number) => {
        return get<Technician>(`/technicians/user/${userId}`).then((response) => response.data)
    },
    getAllAvailableTechnicians: async () => {
        return get<Technician[]>('/technicians/available').then((response) => response.data)
    }
}

export default TechnicianService