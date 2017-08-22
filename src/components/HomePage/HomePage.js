import React from 'react';
import PropTypes from 'prop-types';
import Search from "../../containers/HomePage/Search";
import Issues from "../../containers/HomePage/Issues";
import block from "bem-cn";

const HomePage = ({location}) => {
    const b = block("home-page");
    return (
        <div className={b}>
            <Search className={b("search")}
                    defaultRepoName={location.query.repoName}
                    defaultUserName={location.query.userName}/>
            <Issues location={location}/>
        </div>
    );
};

HomePage.propTypes = {
    location: PropTypes.object.isRequired
};
HomePage.defaultProps = {};

export default HomePage;
