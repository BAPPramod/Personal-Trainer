export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type Training = {
    activity: string;
    date: string;
    duration: number;
    customer: Customer | null;
}