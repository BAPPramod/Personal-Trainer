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
}

export type Training = {
    activity: string;
    date: string;
    duration: string;
    customer: string;
      _links: {
        self: {
          href: string;
        };
      };
}