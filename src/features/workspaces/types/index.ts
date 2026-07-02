export interface CreateWorkspaceResponse {
    success: boolean,
    message: string
}

export interface Workspaces {
    id: string,
    name: string,
    createdAt: Date
}