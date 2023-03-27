export interface LoginReq {
  device_name: string
  email: string
  password: string
}

export interface PropertiesReq {
  page: 1
  per_page: number

}

//I convert the json from the http response to a ts interface
export interface LoginResponse {
  data: {
    accessToken: {
      name: string,
      abilities: [string],
      tokenable_id: number,
      tokenable_type: string,
      updated_at: string,
      created_at: string,
      id: number
    },
    plainTextToken: string
  },
  message: string

}