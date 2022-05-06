import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './features/root/App'
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPosts } from './features/posts/postsSlice';
const rootElement = document.getElementById( 'root' )

store.dispatch(fetchPosts());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement,
)

