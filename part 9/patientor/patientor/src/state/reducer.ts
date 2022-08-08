import { State } from './state';
import { Patient, Diagnosis } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | {
          type: 'FETCH_INDIVIDUAL';
          payload: Patient;
      }
    | {
          type: 'SET_DIAGNOSES';
          payload: Diagnosis[];
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'FETCH_INDIVIDUAL':
            return {
                ...state,
                patients: {
                    [action.payload.id]: action.payload,
                },
            };
        case 'SET_DIAGNOSES':
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnose) => ({
                            ...memo,
                            [diagnose.code]: diagnose,
                        }),
                        {}
                    ),
                    ...state.diagnoses,
                },
            };
        default:
            return state;
    }
};
