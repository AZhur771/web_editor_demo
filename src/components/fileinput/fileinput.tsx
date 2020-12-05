import React from 'react';
import yaml from 'js-yaml';
import { useToasts } from 'react-toast-notifications';
import { useAppDispatch } from './../../redux/store';
import { actions } from '../../redux/reducer';
import styles from './styles.scss';

const FileInput = () => {
    const dispatch = useAppDispatch();
    const { addToast } = useToasts();

    /**
     * @todo add proper types
     */
    const handleFile: React.EventHandler<any> = (e) => {
        const file: File = e.target.files[0];

        if (!file) return

        if (window.FileReader) {
            // additional check for file type
            if (/^(?!.*\.json$).*$/.test(file.name))  {
                console.error('Only json files are excepted');
                addToast('Only json files are excepted', {
                    appearance: 'error',
                    autoDismiss: true
                });
                return;
            }

            const reader: FileReader = new FileReader();
            reader.onload = (e) => {
                let jsonParsed: string = '{}';
                if (e.target!.result) {
                    jsonParsed = JSON.parse(e.target!.result.toString());
                }
                const yamlString: string = yaml.safeDump(jsonParsed);
                dispatch(actions.setFileData(yamlString));
                addToast('json dropped', {
                    appearance: 'info',
                    autoDismiss: true
                });
            };
            reader.onerror = () => console.error(reader.error);
            reader.readAsText(file);
        } else {
            console.error('Your browser does not support File API')
        }
    }

    return (
        <div className={styles.fileinput}>
            <input type={'file'} accept='.json' onChange={handleFile} key={''} />
        </div>
    );
};

export default FileInput;
