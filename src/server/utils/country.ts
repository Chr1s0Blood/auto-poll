import iso3166 from 'iso-3166-2'

export function getCountry (countryCode: string) {

    return iso3166.country(countryCode)

}

export function getStateProvince (countryCode: string, stateCode: string) {

    return iso3166.subdivision(countryCode, stateCode)

}