import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import "./ItemList.css"

class ItemList extends PureComponent {
    render() {
        const items = this.props.children;
        const b = block("item-list");
        return (
            <div className={b()}>
                {items}
            </div>
        );
    }
}

ItemList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};
ItemList.defaultProps = {};

export default ItemList;
