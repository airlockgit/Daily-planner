import React from 'react';
import Calendar from './index';

import renderer from 'react-test-renderer';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('react-redux', () => ({
    useSelector: () => ({
        todos: [],
    }),
}));

test('Calendar renders correctly', () => {
    const ren = renderer
        .create(<Calendar />)
        .toJSON();
    expect(ren).toMatchSnapshot();
});