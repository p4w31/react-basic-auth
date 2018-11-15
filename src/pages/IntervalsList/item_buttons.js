import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {};
  
const propTypes = {
    item: PropTypes.object,
    taskToggleEdited: PropTypes.func,
    taskEditedSave: PropTypes.func,
};

function ItemButtons({ item, taskToggleEdited, taskEditedSave }) {
    if(!item.isEdited) {
        return (
            <button onClick={ () => taskToggleEdited(item) }>Edit</button>
        )
    } else {
        return (
            <span>
                <button onClick={ () => taskEditedSave(item) }>OK</button>
                <button onClick={ () => taskToggleEdited(item) }>Cancel</button>
            </span>
        );
    }
}

ItemButtons.defaultProps = defaultProps;
ItemButtons.propTypes = propTypes;

export default ItemButtons;