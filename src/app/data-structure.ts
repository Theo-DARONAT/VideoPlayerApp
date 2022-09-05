export interface DataStructure {
    link: string ;
};

export interface DataList {
    linkList : DataStructure[];
};

export interface DataManager {
	history: any;
	bookmarks: any;
};
