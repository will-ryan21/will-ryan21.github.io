import logo from './logo.svg';
import './App.css';

import {Button} from '@my-scope/wryan21.multiflex-prime.ui.button';
import {Icon} from '@my-scope/wryan21.multiflex-prime.ui.icon';
//import {Tooltip} from '@my-scope/wryan21.multiflex-prime.ui.tooltip';

function show_tooltip(event) {
  return true;
}

/*
<Tooltip text="Just a tooltip" hidden> </Tooltip>
*/


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <Icon id="help" fill="#ffffff"> </Icon>
      </body>
    </div>
  );
}

export default App;
