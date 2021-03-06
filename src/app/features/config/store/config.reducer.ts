import { ConfigActions, ConfigActionTypes } from './config.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalConfig } from '../config.model';
import { DEFAULT_CFG } from '../default-config.const';

export const CONFIG_FEATURE_NAME = 'globalConfig';
export const selectConfigFeatureState = createFeatureSelector<GlobalConfig>(CONFIG_FEATURE_NAME);
export const selectMiscConfig = createSelector(selectConfigFeatureState, (cfg) => cfg.misc);
export const selectGoogleSession = createSelector(selectConfigFeatureState, (cfg) => cfg._googleSession);

export const initialState: GlobalConfig = DEFAULT_CFG;

export function configReducer(
  state = initialState,
  action: ConfigActions
): GlobalConfig {
  // console.log(action, state);

  switch (action.type) {
    case ConfigActionTypes.LoadConfig: {
      const {cfg, isOmitTokens} = action.payload;
      if (isOmitTokens) {
        const currentGoogleSession = state._googleSession
          ? state._googleSession
          : {};

        return {
          ...cfg,
          _googleSession: {
            ...cfg._googleSession,
            ...currentGoogleSession
          },
        };
      } else {
        return {
          ...cfg
        };
      }
    }

    case ConfigActionTypes.UpdateConfigSection:
      const {sectionKey, sectionCfg} = action.payload;
      return {
        ...state,
        [sectionKey]: {
          ...state[sectionKey],
          ...sectionCfg
        }
      };

    default:
      return state;
  }
}
