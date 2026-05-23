// app/types/media.types.ts

export interface Breakdown {
  type: string; // Gallery uses "type"
  breakdownLink?: string; // MediaDisplay uses this
  breakdownDescription?: string;
}

export interface Tool {
  name: string;
}

export interface MediaType {
  name: string;
}

export interface Media {
  _id: string;
  name: string;
  description: string;
  previewImageURL: string;
  dateOfCreation: string;
  link?: string | null;
  breakdowns?: Breakdown[];
  tool_ids: Tool[];
  typeOfMedia_ids: MediaType;
}