import React from 'react';
import PropTypes from 'prop-types';
import Search from "../../containers/HomePage/Search";
import Issues from "../../containers/HomePage/Issues";
import block from "bem-cn";
import Paging from "../../containers/HomePage/Paging";

const HomePage = ({validatedQuery, issuesPagesCount}) => {
    const b = block("home-page");
    return (
        <div className={b}>
            <Search className={b("search")} query={validatedQuery}/>
            <Issues query={validatedQuery}/>
            {issuesPagesCount > 1
            && <Paging pagesNumber={issuesPagesCount} currentPage={+validatedQuery.pageNumber} query={validatedQuery}/>}
        </div>
    );
};

HomePage.propTypes = {
    validatedQuery: PropTypes.object.isRequired,
    issuesPagesCount: PropTypes.number.isRequired
};
HomePage.defaultProps = {};

export default HomePage;
