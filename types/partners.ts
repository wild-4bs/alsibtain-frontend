type Partner = {
  _id: string;
  name: string;
  logo: {
    fileId: string;
    url: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PartnersResponse = {
  payload: Partner[];
  message: string;
  total: number;
  page: number;
  lastPage: number;
};

export type { Partner, PartnersResponse };
