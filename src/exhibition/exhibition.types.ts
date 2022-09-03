export interface VenueDTO {
  country: string;
  begindate: string;
  address2: string;
  city: string;
  address1: string;
  isHamVenue: number;
  zipcode: string;
  enddate: string;
  venueId: number;
  name: string;
  fullName: string;
  state: string;
  galleries: GalleryDTO[];
}

interface GalleryDTO {
  gallerynumber: string;
  galleryid: number;
  name: string;
  floor: number;
}

export interface ExternalCurrentExhibitionsResponseDTO {
  info: {
    totalrecordsperquery: number;
    totalrecords: number;
    pages: number;
    page: number;
  };
  records: ExhibitionDTO[];
}

interface ExhibitionDTO {
  id: number;
  title: string;
  begindate: string;
  enddate: string;
  description: string;
  shortdescription: string;
  venue: VenueDTO;
}
