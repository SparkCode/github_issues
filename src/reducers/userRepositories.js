import {RECEIVE_USER_REPOSITORIES} from "../actionCreators";

const userRepositories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_USER_REPOSITORIES: {
            return action.repos;
        }
        default: return state;
    }
};

export default userRepositories;