export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        };
    };
};

export type Training = {
    activity: string;
    date: string;
    duration: string;
    _links: {
        self: { href: string };
        customer: { href: string };
    };
};

export type NewTraining = {
    activity: string;
    date: string;
    duration: string;
    customer: string;
};


// Training with populated customer data (for calendar view)
export type TrainingWithCustomer = Training & {
    customerData: Customer;
};

// Event type for react-big-calendar
export type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
};

export type GroupedTraining = {
    activity: string;
    totalDuration: number;
};
