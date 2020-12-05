import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { actions, State } from './../../redux/reducer';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

import { configureEditor, initYamlSyntaxChecker } from './utils';

import styles from './styles.scss';

// write proper interfaces later
export interface IConfig {
    mode: string;
    theme: string;
    minLines: number;
    fontSize: number;
    tabSize: number;
};

export interface IAceEditor {
    [index: string]: any;
};

const config: IConfig = {
    mode: 'ace/mode/yaml',
    theme: 'ace/theme/merbivore',
    minLines: 10,
    fontSize: 14,
    tabSize: 2,
};

// YAML syntax validation implemented with js-yaml library
// https://medium.com/@valentin.shamsnejad/how-to-add-yaml-syntax-validation-to-ace-editor-6db1dff4ab1b
initYamlSyntaxChecker(ace);
class AceEditor extends Component<PropsFromRedux> {
    editor: IAceEditor | null;
    // @ts-ignore
    constructor(props) {
        super(props);
        this.editor = null;
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        const { setCurrentFileData } = this.props;
        const newFileData = this.editor!.getValue();

        setCurrentFileData(newFileData)
    }

    componentDidMount() {
        this.editor = configureEditor(ace, styles.editor, config);
        this.editor!.on('change', this.onChangeHandler);
    }

    componentDidUpdate() {
        const { currentFileData } = this.props;
        const value = this.editor!.getValue()

        // skip updating editor value if already in sync with store
        if (value.length === currentFileData.length) return;
        else if (value !== currentFileData) {
            this.editor!.setValue(currentFileData);
            this.editor!.clearSelection();
        }
    }

    componentWillUnmount() {
        this.editor!.destroy();
        this.editor!.container.remove();    
    }

    render() {
        return <div id={styles.editor}></div>;
    }
}

const mapStateToProps = (state: State) => state;

const connector = connect(
    mapStateToProps,
    actions
)

type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(AceEditor);
