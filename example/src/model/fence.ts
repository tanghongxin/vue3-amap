export interface Fence {
  gfid?: number;
  name: string;
  desc: string;
  shape: unknown;
  type: string;
  createtime?: number;
  modifytime?: number;
}

export interface Status {
  gfid: number;
  gfname: string;
  in: '1' | '0';
}
