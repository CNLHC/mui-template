import { produce } from "immer";
import { Reducer } from "redux";
import { InstanceModel } from "../../../sought-interface/pbfe/web/instance_pb";

export const CDN_SESSION_KEY = "CDN_SESSION_TOKEN";
export type LangCode = "zh" | "en"

export type TState = {
  lang: LangCode
  instances: InstanceModel.AsObject[]
};


const initState: TState = {
  lang: "zh",
  instances: []
};


const ActNameSetState = "[Global]SetState"

export const ActSetGlobalState = (state: Partial<TState>) => ({
  type: ActNameSetState as typeof ActNameSetState,
  state
});


export type TAction = ReturnType<typeof ActSetGlobalState>;

export const GlobalReducer: Reducer<TState, TAction> = (
  state = initState,
  action
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActNameSetState:
        return { ...draft, ...action.state };
    }
    return draft;
  });
