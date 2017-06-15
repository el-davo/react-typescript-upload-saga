import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import UploadContainer from './upload/upload.container';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={configureStore({})}>
      <div>
        <UploadContainer />
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);