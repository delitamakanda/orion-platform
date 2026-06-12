import { environment } from '@environments/environment';

export interface ApiConfig {
    apiUrl: string;
    backendUrl: string;
}

export const API_CONFIG: ApiConfig = {
    apiUrl: environment.apiUrl,
    backendUrl: environment.backendUrl
};
