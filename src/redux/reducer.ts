import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
    originalFileData: string,
    currentFileData: string
};

const initialState: State = {
    originalFileData: '',
    currentFileData: ''
};

const FileDataSlice =  createSlice({
    name: 'fileData',
    initialState,
    reducers: {
        setFileData: (state, action: PayloadAction<string>) => {
            // Immer allows "mutating" state
            const { payload } = action;
            state.originalFileData = payload;
            state.currentFileData = payload;
        },
        setCurrentFileData: (state, action: PayloadAction<string>) => {
            const { payload } = action;
            state.currentFileData = payload;
        },
        restoreInitialFileData: (state, _: PayloadAction<void>) => {
            state.currentFileData = state.originalFileData;
        },
        resetFileData: (state, _: PayloadAction<void>) => {
            state.originalFileData = '';
            state.currentFileData = '';
        }
    }
});

export default FileDataSlice.reducer;

export const actions = FileDataSlice.actions;
