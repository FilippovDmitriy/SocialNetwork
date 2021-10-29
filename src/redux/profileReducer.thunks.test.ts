import {getProfile} from './profileReducer'
import {profileAPI} from "../api/profileApi";
import {ProfileType} from "../types/types";

jest.mock("../api/profileApi");
const profileApiMock = profileAPI as jest.Mocked<typeof profileAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
   dispatchMock.mockClear();
   getStateMock.mockClear();
});

const result: ProfileType = {
    fullName: 'DF',
    lookingForAJob: false,
    userId: 2,
    lookingForAJobDescription: 'string',
    aboutMe: 'string',
    contacts: {
        github: 'string',
        vk: 'string',
        facebook: 'string',
        instagram: 'string',
        twitter: 'string',
        website: 'string',
        youtube: 'string',
        mainLink: 'string',
    },
    photos: {
        small: 'string',
        large: 'string',
    },
};

profileApiMock.getProfile.mockReturnValue(Promise.resolve(result));

test('dispatch in getProfile thunk must be called 1 times', async () => {
    const thunk = getProfile(2);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(1);
});