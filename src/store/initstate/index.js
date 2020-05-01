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
            }
        ],
        isLoading: false,
    },
    activity: {
        todos: [
            {
                title: undefined,
                date: undefined,
                timeFrom: undefined,
                timeTo: undefined,
                id: 0,
            }
        ],
        id: 1,
    },
};

export default initialState;