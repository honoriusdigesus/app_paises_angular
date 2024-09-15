import {Country} from "./country.interface";
import {Region} from "./region.tye";

export interface CacheStoreInterface {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries{
  term: string;
  countries: Country[];
}

export interface RegionCountries{
  region: Region;
  countries: Country[];
}
