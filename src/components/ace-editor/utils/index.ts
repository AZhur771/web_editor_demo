import { IConfig, IAceEditor } from './../ace-editor';
import extendYamlMode from './extend_yaml_mode';

export const configureEditor = (ace: IAceEditor, wrapperId: string, config: IConfig) => {
    return ace.edit(wrapperId, config);
}

export const initYamlSyntaxChecker = (ace: IAceEditor) => {
    console.warn('YAML syntax check init');
    extendYamlMode(ace);
}