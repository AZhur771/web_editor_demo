import React from 'react';
import { useSelector } from 'react-redux';
import yaml from 'js-yaml';
import { useToasts } from 'react-toast-notifications';
import FileInput from './../fileinput';
import { actions, State } from '../../redux/reducer';
import { useAppDispatch } from '../../redux/store';
import { randomString } from './../../utils';

import Button from './../button';

import styles from './styles.scss';

const Header = () => {
    const dispatch = useAppDispatch();
    const yamlString = useSelector((state: State) => state.currentFileData);
    const { addToast } = useToasts();

    const flushFile = () => {
        dispatch(actions.resetFileData());
        addToast('File flushed', {
            appearance: 'info',
            autoDismiss: true
        });
    }

    const restoreFile = () => {
        dispatch(actions.restoreInitialFileData());
        addToast('Initial file data restored', {
            appearance: 'info',
            autoDismiss: true
        });
    }

    const exportFile = () => {
        if (!yamlString) {
            console.error('Empty file cannot be exported');
            addToast('Empty file cannot be exported', {
                appearance: 'error',
                autoDismiss: true,
            });

            return;
        }
    
        const jsObject = yaml.safeLoad(yamlString);

        // hack to export json
        const dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsObject, null, 2));
        const link = document.createElement('a');
        link.download = `${randomString()}.json`;
        link.href = dataStr;
        link.click();
        URL.revokeObjectURL(link.href);
        link.remove();

        addToast('File has been exported', {
            appearance: 'success',
            autoDismiss: true,
        });
    }

    return (
        <div className={styles.header}>
            <h1>
                Drop your json here...
            </h1>
            <div className={styles.fileinput}>
                    <FileInput />
                </div>
            <div className={styles.button_wrapper}>
                <div>
                    <Button title={'flush file'} cb={flushFile} />
                </div>
                <div>
                    <Button title={'restore file'} cb={restoreFile} />
                </div>
                <div>
                    <Button title={'export file'} cb={exportFile} />
                </div>
            </div>
        </div>
    )
};

export default Header;
