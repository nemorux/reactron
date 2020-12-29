import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import makeStore from "src/store";
import Main from 'src/pages';
import 'src/core/styles/global.scss';

const store = makeStore(false);

const mainElement = document.createElement('div');
mainElement.setAttribute("id", "root");
document.body.appendChild(mainElement);

ReactDom.render(<Provider store={store}><Main/></Provider>, mainElement);
