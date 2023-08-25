export interface IPropsAuthor {
  key: string;
  name: string;
}

export interface IPropsBook {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  cover_edition_key: string;
  cover_link: string;
  subject: string[];
  ia_collection: string[];
  lendinglibrary: boolean;
  printdisabled: boolean;
  lending_edition: string;
  lending_identifier: string;
  authors: IPropsAuthor[];
  first_publish_year: number;
  ia: string;
  public_scan: string;
  has_fulltext: boolean;
  availability: {
    status: string;
    available_to_browse: boolean;
    available_to_borrow: boolean;
    available_to_waitlist: boolean;
    is_printdisabled: boolean;
    is_readable: boolean;
    is_lendable: boolean;
    is_previewable: boolean;
    identifier: string;
    isbn: string;
    oclc: null;
    openlibrary_work: string;
    openlibrary_edition: string;
    last_loan_date: null;
    num_waitlist: null;
    last_waitlist_date: null;
    is_restricted: boolean;
    is_browseable: boolean;
    __src__: string;
  };
}

export interface IPropsSubject {
  name: string;
  count: number;
  url: string;
}

export interface IPropsModalBook extends IPropsBook {
  created?: {
    value: string;
  };
  last_modified?: {
    value: string;
  };
  revision?: string;
  description?: {
    value: string;
  };
}
