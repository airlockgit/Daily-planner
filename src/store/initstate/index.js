const initialState = {
    app: {
        menu: [
            {
                title: 'Календарь',
                link: '/calendar',
            },
            {
                title: 'Мероприятия',
                link: '/activity',
            },
            {
                title: 'Услуги',
                link: '/services',
            }
        ],
        services: {
            error: false,
            isLoading: false,
            products: [],
            product: {},
        }
    },
    activity: {
        todos: [
            {
                title: undefined,
                date: undefined,
                timeFrom: undefined,
                timeTo: undefined,
                remindTime: false,
                closed: false,
                id: 0,
            }
        ],
        id: 1,
    },
};

export default initialState;