import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";

class ListItem extends PureComponent {
    render() {
        const listItem = this.props.children;
        const b = block("item-list");
        return (
            <div className={b()}>
                {listItem}
            </div>
        );
    }
}

ListItem.propTypes = {
    children: PropTypes.element.isRequired
};
ListItem.defaultProps = {};

export default ListItem;
