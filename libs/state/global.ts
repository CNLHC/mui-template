import { produce } from "immer";
import { Reducer } from "redux";

export const CDN_SESSION_KEY = "CDN_SESSION_TOKEN";
export type LangCode = "zh" | "en"

export type TState = {
  lang: LangCode
  show_sidebar: boolean
  collapse_state: { [key: string]: boolean }
};


const initState: TState = {
  lang: "zh",
  show_sidebar: true,
  collapse_state: {}
};


const ActNameSetState = "[Global]SetState"
const ActNameCollapse = "[Global]Collapse"
export const ActSetGlobalState = (state: Partial<TState>) => ({
  type: ActNameSetState as typeof ActNameSetState,
  state
});

export const ActCollapse = (state: {
  key: string,
  isCollapsed: boolean
}) => ({
  type: ActNameCollapse as typeof ActNameCollapse,
  ...state
});


export type TAction = ReturnType<typeof ActSetGlobalState> | ReturnType<typeof ActCollapse>;

export const GlobalReducer: Reducer<TState, TAction> = (
  state = initState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActNameSetState:
        return { ...draft, ...action.state };
      case ActNameCollapse:
        draft.collapse_state[action.key] = action.isCollapsed
        return draft
    }
  });
