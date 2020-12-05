import React from 'react';
import { ToastProvider } from 'react-toast-notifications'
import Header from './../components/header';
import AceEditor from './../components/ace-editor';

import styles from './styles.scss';

const toastPlacement: string = 'bottom-center';

const App = () => {
    return (
        <div className={styles.app_wrapper}>
            <ToastProvider placement={toastPlacement}>
                <div className={styles.app_header}>
                    <Header />
                </div>
                <div className={styles.app_body}>
                    <AceEditor />
                </div>
            </ToastProvider>
        </div>
    );
}

export default App
