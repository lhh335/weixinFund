import dva from 'dva';
import { registerModels } from './models';
// import { createAction } from "./utils/index";
import './index.css';

// 1. Initialize
const app = dva({
  onError(e, dispatch) {
    console.log('onError***********', e);
    if (
      `${e}` === 'TypeError: Network request failed' ||
      e.response === 'TimeOut'
    ) {
      console.log('TimeOut');
    } else {
    }
  },

});

// 2. Plugins
// app.use({});

// 3. Model
registerModels(app);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export const store = app._store;
export const dispatch = app._store.dispatch;
console.log(app);
