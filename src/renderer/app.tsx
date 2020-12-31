import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from "src/shared/store";
import Main from 'src/renderer/pages';
import 'src/renderer/core/styles/global.scss';

/// WORKAROUND for sake of having it in output
import img from 'src/shared/assets/icon256.png';
img.toString();

const store = makeStore(false);

const mainElement = document.createElement('div');
mainElement.setAttribute("id", "root");
document.body.appendChild(mainElement);

ReactDom.render(<Provider store={store}><Main /></Provider>, mainElement);
