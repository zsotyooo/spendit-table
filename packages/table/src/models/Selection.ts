export enum SelectionActionType {
  Reset = "reset",
  SetAll = "set-all",
  Set = "set",
  Remove = "remove",
}

export type SelectionAction =
  | {
      type: SelectionActionType.Reset;
    }
  | {
      type: SelectionActionType.SetAll;
    }
  | {
      type: SelectionActionType.Set;
      index: number;
    }
  | {
      type: SelectionActionType.Remove;
      index: number;
    };
