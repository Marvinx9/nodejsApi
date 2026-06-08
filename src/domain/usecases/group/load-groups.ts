export type GroupListItem = {
  id: string;
  name: string;
  countSurveys: number;
};

export interface LoadGroups {
  load(name?: string): Promise<GroupListItem[]>;
}
