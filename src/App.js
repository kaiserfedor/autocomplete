import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import AutocompleteItem from './AutocompleteItem';
import './app.less';

export default class App extends Component {

  render() {
    let data = [
      {id: 1, name: 'qwe'},
      {id: 2, name: 'asd'},
      {id: 3, name: 'zxc'},
      {id: 4, name: 'qxc'},
      {id: 5, name: 'aew'}
    ];

    return (
      <div className="box">
        <Autocomplete
            onSelect={(value) => console.log('Выбранное значение: ', value)}
            fetchData={(search) => new Promise(resolve => setTimeout(() => resolve(data), 1000))}
            itemRender={(item) => <AutocompleteItem item={item} key={item.id}/>}
        />
      </div>
    );
  }
}
