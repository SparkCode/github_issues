import {searchIssues} from "../../actionCreators";
import {connect} from "react-redux";
import Paging from "../../components/HomePage/Paging";

const mapStateToProps = (state) => {
    return {
        pagesNumber: state.issues.paging.issuesPagesCount
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        gotoNewPage: (pageNumber) => {
            dispatch(searchIssues({...ownProps.query, pageNumber}));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);