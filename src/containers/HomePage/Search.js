import {searchIssues} from "../../actionCreators/actionCreators"
import {connect} from "react-redux";
import Search from "../../components/HomePage/Search";

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (userName, repoName) => {
            dispatch(searchIssues(userName, repoName));
        }
    }
};


export default connect(null, mapDispatchToProps)(Search);