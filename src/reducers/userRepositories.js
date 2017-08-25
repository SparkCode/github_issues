import {INVALIDATE_USER_REPOSITORIES, RECEIVE_USER_REPOSITORIES} from "../actionCreators";

const userRepositories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_USER_REPOSITORIES: {
            return action.repos;
        }

        case INVALIDATE_USER_REPOSITORIES: {
            return [];
        }

        default: return state;
    }
};

export default userRepositories;