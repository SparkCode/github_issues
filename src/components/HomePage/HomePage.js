import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Search from "../../containers/HomePage/Search";
import Issues from "../../containers/HomePage/Issues";
import block from "bem-cn";
import Paging from "../../containers/HomePage/Paging";

class HomePage extends PureComponent {
    render() {
        const {validatedQuery, shouldShowPaging} = this.props;
        const b = block("home-page");
        return (
            <div className={b}>
                <Search className={b("search")()} query={validatedQuery}/>
                <Issues query={validatedQuery}/>
                {shouldShowPaging && <Paging currentPage={+validatedQuery.pageNumber} query={validatedQuery}/>}
            </div>
        );
    }
}

HomePage.propTypes = {
    validatedQuery: PropTypes.object.isRequired,
    shouldShowPaging: PropTypes.bool.isRequired
};
HomePage.defaultProps = {};

export default HomePage;
