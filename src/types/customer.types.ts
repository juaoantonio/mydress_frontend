export type CustomerType = {
    id: string;
    name: string;
    cpf: string | null;
    rg: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    notes?: string;
    created_at: string;
    updated_at: string;
};
