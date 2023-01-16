import axios from 'axios'
import {AWS_COGNITO_ENDPOINT} from '@clubwoof-constants'

export const awsMockApi = axios.create({baseURL: AWS_COGNITO_ENDPOINT})
