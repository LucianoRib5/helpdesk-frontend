import type { City } from '../types/city'
import ApiService from './ApiService'

const { get } = ApiService

const CityService = {
    getCityByCep: async (cep: string) => {
        return get<City>(`/cities/cep/${cep}`)
    },
}

export default CityService