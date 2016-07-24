import React, { Component, PropTypes } from 'react';
import './Autocomplete.less'

export default class Autocomplete extends Component {

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    itemRender: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._onItemClickHandler = this._onItemClickHandler.bind(this);
    this._onBlurHandler = this._onBlurHandler.bind(this);
    this._onFocusHandler = this._onFocusHandler.bind(this);
    this.state = {
      items: [],
      filteredItems: [],
      inputValue: ''
    };
  }

  /**
   * Получаем данные
   */
  componentDidMount() {
    this.props.fetchData().then((result) => {
      this.setState({
        items: result
      });
    });
  }

  render() {
    let items = this.state.filteredItems.map((item) => {
      return this.props.itemRender(item)
    });

    return (
      <div className="autocomplete">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this._onChangeHandler}
          onFocus={this._onFocusHandler}
          onBlur={this._onBlurHandler}
        />
        <div onMouseDown={this._onItemClickHandler}>
          {items}
        </div>
      </div>
    );
  }

  /**
   * Обработчик события потери фокуса. Очищает список отфильтрованных элементов
   * @private
   */
  _onBlurHandler() {
    this.setState({
      filteredItems: []
    });
  }

  /**
   * Обработчик события получения фокуса. Фильтрует элементы по текущему значению
   * @param {SyntheticEvent} event
   * @private
   */
  _onFocusHandler(event) {
    this.setState({
      filteredItems: this._filterItems(event.target.value)
    });
  }

  /**
   * Обработчик события клика по элементу.
   * @param {SyntheticEvent} event
   * @private
   */
  _onItemClickHandler(event) {
    var nodes = Array.prototype.slice.call(event.currentTarget.children);
    var index = nodes.indexOf(event.target);
    this.props.onSelect(this.state.filteredItems[index].id);
    this.setState({
      inputValue: this.state.filteredItems[index].name
    });
  }

  /**
   * Обработчик события изменения значения инпута
   * @param {SyntheticEvent} event
   * @private
   */
  _onChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
      filteredItems: this._filterItems(event.target.value)
    });
  }

  /**
   * Получить массив отфильтрованных элементов
   * @param {string} value Строка фильтрации
   * @private
   */
  _filterItems(value) {
    return this.state.items.filter((item) => {
      return ~item.name.indexOf(value);
    });
  }
}
