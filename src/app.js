import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';

import Search from './Search'

injectTapEventPlugin();

const uri = 'https://api.github.com/search/repositories?q=created:"2015-01-01+..+2016-01-01"&sort=stars&order=desc&per_page=100'

ReactDOM.render(
  <Search />,
  document.getElementById('content')
)
