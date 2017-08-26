import {searchIssues} from "../../actionCreators";
import {connect} from "react-redux";
import Paging from "../../components/HomePage/Paging";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        gotoNewPage: (pageNumber) => {
            dispatch(searchIssues({...ownProps.query, pageNumber}));
        },
    }
};

export default connect(null, mapDispatchToProps)(Paging);