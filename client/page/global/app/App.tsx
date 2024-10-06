import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import { RecoilRoot } from 'recoil';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { ContentContainer } from 'client/page/global/content/ContentContainer';

import './style.module.css';
import './token.module.css';
import './mod/moment';
import './mod/arco';
import './mod/pdf';
import './mod/typescript';

const AppComponent = () => {
    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <Routes>
                    <Route
                        path={'/v2/*'}
                        element={<ContentContainer />}
                    />
                </Routes>
            </QueryParamProvider>
        </BrowserRouter>
    );
};

const App = () => {
    return (
        <RecoilRoot>
            <ConfigProvider>
                <AppComponent />
            </ConfigProvider>
        </RecoilRoot>
    );
};

export default App;
