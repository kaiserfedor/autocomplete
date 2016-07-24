import React, { Component, PropTypes } from 'react';
import './AutocompleteItem.less';

export default class AutocompleteItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="autocomplete-item">
        {this.props.item.name}
      </div>
    );
  }
}
