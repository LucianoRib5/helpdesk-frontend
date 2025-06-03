interface State {
    id: number
    name: string
    abbreviation: string
}

export interface City {
    id: number
    name: string
    state: State
    cep: string
}
