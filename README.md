# NOAA METAR and TAF


- [Overview](#a-simple-helper-library-for-getting-weather-data)
- [How to use](#how-to-use)
  * [Installing](#installing)
  * [Usage](#usage)
  * [Examples](#examples)
  * [Sample Output](#sample-output)
    + [METAR](#METAR)
    + [TAF](#TAF)
    + [Airport Weather](#airport-weather)
- [LICENSE](#license)

## A simple helper library for getting weather data

This library is designed to pull in weather data from NOAA in the form of [METARs](https://www.wunderground.com/metarFAQ.asp) and [TAFS](https://aviationweather.gov/static/help/taf-decode.php). Both formats encode weather data using the [following codes](https://www.weather.gov/media/wrh/mesowest/metar_decode_key.pdf). 

## How to use

### Installing

Installing is simple via NPM or YARN

```shell
$ npm install noaa-metar
```

```shell
$ yarn add noaa-metar
```

### Usage
There are three methods that the library exposes. Each method takes the following two parameters. the methods are:

- `getMETAR(ICAOCode, hoursBack)`: Gets MERTARs for ICAO coded location
- `getTAF(ICAOCode, hoursBack`): Gets TAFs for ICAO coded location
- `getAirportWeather(ICAOCode, hoursBack)`: Gets both METARs and TAFS for ICAO coded location

 And the definition of the parameters

|Parameter|Description|Example|
|---|---|---|
|ICAO Code| required, either a single string of an ICAO coded location, or an array of ICAO coded locations as strings| 'KEWR', ['KEWR', 'KJFK']|
|hoursBack|optional, the number of hours back to get forecasts for, default = 4| 6|

`getMETAR` and `getTAF` will return an array of forecast objects

`getAirportWeather` will return an object with 2 keys - TAFS and METARS. Those keys will each contain an array of forecast objects

### Examples

```js
const noaaMetar =  require('./noaa-metar')

noaaMetar.getMETAR(['KEWR', 'KMCO'], 4)
  .then(result => console.log(result))

noaaMetar.getTAF('KEWR', 3)
  .then(result => console.log(result))

noaaMetar.getAirportWeather('KEWR')
  .then(result => console.log(result))

```

### Sample Output

Since the forecast data is based off of the METAR and TAF coded standards, your results may differ slightly from these samples.

#### METAR

```js
[
  { 
    raw_text: 'KMCO 241553Z VRB05KT 10SM SCT250 33/19 A3005 RMK AO2 SLP175 T03280194',
    station_id: 'KMCO',
    observation_time: '2019-06-24T15:53:00Z',
    latitude: 28.42,
    longitude: -81.33,
    temp_c: 32.8,
    dewpoint_c: 19.4,
    wind_dir_degrees: 0,
    wind_speed_kt: 5,
    visibility_statute_mi: 10,
    altim_in_hg: 30.050198,
    sea_level_pressure_mb: 1017.5,
    quality_control_flags: {
      auto_station: true
    },
    sky_condition: {
      sky_cover: 'SCT',
      cloud_base_ft_agl: 25000
    },
    flight_category: 'VFR',
    metar_type: 'METAR',
    elevation_m: 29
  },
  { 
    raw_text: 'KEWR 241551Z 25005KT 10SM FEW065 FEW180 BKN250 29/12 A2988 RMK AO2 SLP116 T02940117',
    station_id: 'KEWR',
    observation_time: '2019-06-24T15:51:00Z',
    latitude: 40.68,
    longitude: -74.17,
    temp_c: 29.4,
    dewpoint_c: 11.7,
    wind_dir_degrees: 250,
    wind_speed_kt: 5,
    visibility_statute_mi: 10,
    altim_in_hg: 29.878937,
    sea_level_pressure_mb: 1011.6,
    quality_control_flags: {
      auto_station: true
    },
    sky_condition: [
      {
        sky_cover: 'BKN',
        cloud_base_ft_agl: 1000
      },
      {
        sky_cover: 'OVC',
        cloud_base_ft_agl: 4000
      }
    ],
    flight_category: 'VFR',
    metar_type: 'METAR',
    elevation_m: 7
  }
]
```

#### TAF
```js
[
  {
    raw_text: 'KEWR 241333Z 2414/2518 24006KT P6SM FEW050 SCT250 FM241900 22009KT P6SM SCT050 BKN200 FM242100 17009KT P6SM SCT050 BKN200 FM242300 17008KT P6SM SCT050 BKN100 FM250400 16005KT P6SM SCT020 BKN100 FM250900 14005KT 4SM -SHRA BR SCT009 BKN015 TEMPO 2509/2513 2SM SHRA BR BKN009 OVC015 FM251500 17008KT 6SM -SHRA BKN010 OVC040',
    station_id: 'KEWR',
    issue_time: '2019-06-24T13:33:00Z',
    bulletin_time: '2019-06-24T13:33:00Z',
    valid_time_from: '2019-06-24T14:00:00Z',
    valid_time_to: '2019-06-25T18:00:00Z',
    remarks: 'AMD',
    latitude: 40.68,
    longitude: -74.17,
    elevation_m: 7,
    forecast: [
      {
        fcst_time_from: '2019-06-24T14:00:00Z',
        fcst_time_to: '2019-06-24T19:00:00Z',
        wind_dir_degrees: 240,
        wind_speed_kt: 6,
        visibility_statute_mi: 6.21,
        sky_condition: [
          {
            sky_cover: 'FEW',
            cloud_base_ft_agl: 5000
          },
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 25000
          }
        ]
      },
      {
        fcst_time_from: '2019-06-24T19:00:00Z',
        fcst_time_to: '2019-06-24T21:00:00Z',
        change_indicator: 'FM',
        wind_dir_degrees: 220,
        wind_speed_kt: 9,
        visibility_statute_mi: 6.21,
        sky_condition: [
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 5000
          },
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 20000
          }
        ]
      },
      {
        fcst_time_from: '2019-06-24T21:00:00Z',
        fcst_time_to: '2019-06-24T23:00:00Z',
        change_indicator: 'FM',
        wind_dir_degrees: 170,
        wind_speed_kt: 9,
        visibility_statute_mi: 6.21,
        sky_condition: [
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 5000
          },
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 20000
          }
        ]
      },
      {
        fcst_time_from: '2019-06-24T23:00:00Z',
        fcst_time_to: '2019-06-25T04:00:00Z',
        change_indicator: 'FM',
        wind_dir_degrees: 170,
        wind_speed_kt: 8,
        visibility_statute_mi: 6.21,
        sky_condition: [
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 5000
          },
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 10000
          }
        ]
      },
      {
        fcst_time_from: '2019-06-25T04:00:00Z',
        fcst_time_to: '2019-06-25T09:00:00Z',
        change_indicator: 'FM',
        wind_dir_degrees: 160,
        wind_speed_kt: 5,
        visibility_statute_mi: 6.21,
        sky_condition: [
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 2000
          },
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 10000
          }
        ]
      },
      {
        fcst_time_from: '2019-06-25T09:00:00Z',
        fcst_time_to: '2019-06-25T13:00:00Z',
        change_indicator: 'TEMPO',
        visibility_statute_mi: 2,
        wx_string: SHRA BR,
        sky_condition: [
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 900
          },
          {
            sky_cover: 'OVC',
            cloud_base_ft_agl: 1500
          }
        ]
      },
      {
        fcst_time_from: '2019-06-25T09:00:00Z',
        fcst_time_to: '2019-06-25T15:00:00Z',
        change_indicator: 'FM',
        wind_dir_degrees: 140,
        wind_speed_kt: 5,
        visibility_statute_mi: 4,
        wx_string: '-SHRA BR',
        sky_condition: [
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 900
          },
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 1500
          }
        ]
      },
      {
        fcst_time_from: '2019-06-25T15:00:00Z',
        fcst_time_to: '2019-06-25T18:00:00Z',
        change_indicator: 'FM',
        wind_dir_degrees: 170,
        wind_speed_kt: 8,
        visibility_statute_mi: 6,
        wx_string: '-SHRA',
        sky_condition: [
          {
            sky_cover: 'BKN',
            cloud_base_ft_agl: 1000
          },
          {
            sky_cover: 'OVC',
            cloud_base_ft_agl: 4000
          }
        ]
      }
    ]
  }
]
```

#### Airport Weather
```js
{ 
  TAFS: 
    [
      {
        raw_text: 'KEWR 241333Z 2414/2518 24006KT P6SM FEW050 SCT250 FM241900 22009KT P6SM SCT050 BKN200 FM242100 17009KT P6SM SCT050 BKN200 FM242300 17008KT P6SM SCT050 BKN100 FM250400 16005KT P6SM SCT020 BKN100 FM250900 14005KT 4SM -SHRA BR SCT009 BKN015 TEMPO 2509/2513 2SM SHRA BR BKN009 OVC015 FM251500 17008KT 6SM -SHRA BKN010 OVC040',
        station_id: 'KEWR',
        issue_time: '2019-06-24T13:33:00Z',
        bulletin_time: '2019-06-24T13:33:00Z',
        valid_time_from: '2019-06-24T14:00:00Z',
        valid_time_to: '2019-06-25T18:00:00Z',
        remarks: 'AMD',
        latitude: 40.68,
        longitude: -74.17,
        elevation_m: 7,
        forecast: [
          {
            fcst_time_from: '2019-06-24T14:00:00Z',
            fcst_time_to: '2019-06-24T19:00:00Z',
            wind_dir_degrees: 240,
            wind_speed_kt: 6,
            visibility_statute_mi: 6.21,
            sky_condition: [
              {
                sky_cover: 'FEW',
                cloud_base_ft_agl: 5000
              },
              {
                sky_cover: 'SCT',
                cloud_base_ft_agl: 25000
              }
            ]
          },
          {
            fcst_time_from: '2019-06-24T19:00:00Z',
            fcst_time_to: '2019-06-24T21:00:00Z',
            change_indicator: 'FM',
            wind_dir_degrees: 220,
            wind_speed_kt: 9,
            visibility_statute_mi: 6.21,
            sky_condition: [
              {
                sky_cover: 'SCT',
                cloud_base_ft_agl: 5000
              },
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 20000
              }
            ]
          },
          {
            fcst_time_from: '2019-06-24T21:00:00Z',
            fcst_time_to: '2019-06-24T23:00:00Z',
            change_indicator: 'FM',
            wind_dir_degrees: 170,
            wind_speed_kt: 9,
            visibility_statute_mi: 6.21,
            sky_condition: [
              {
                sky_cover: 'SCT',
                cloud_base_ft_agl: 5000
              },
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 20000
              }
            ]
          },
          {
            fcst_time_from: '2019-06-24T23:00:00Z',
            fcst_time_to: '2019-06-25T04:00:00Z',
            change_indicator: 'FM',
            wind_dir_degrees: 170,
            wind_speed_kt: 8,
            visibility_statute_mi: 6.21,
            sky_condition: [
              {
                sky_cover: 'SCT',
                cloud_base_ft_agl: 5000
              },
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 10000
              }
            ]
          },
          {
            fcst_time_from: '2019-06-25T04:00:00Z',
            fcst_time_to: '2019-06-25T09:00:00Z',
            change_indicator: 'FM',
            wind_dir_degrees: 160,
            wind_speed_kt: 5,
            visibility_statute_mi: 6.21,
            sky_condition: [
              {
                sky_cover: 'SCT',
                cloud_base_ft_agl: 2000
              },
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 10000
              }
            ]
          },
          {
            fcst_time_from: '2019-06-25T09:00:00Z',
            fcst_time_to: '2019-06-25T13:00:00Z',
            change_indicator: 'TEMPO',
            visibility_statute_mi: 2,
            wx_string: SHRA BR,
            sky_condition: [
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 900
              },
              {
                sky_cover: 'OVC',
                cloud_base_ft_agl: 1500
              }
            ]
          },
          {
            fcst_time_from: '2019-06-25T09:00:00Z',
            fcst_time_to: '2019-06-25T15:00:00Z',
            change_indicator: 'FM',
            wind_dir_degrees: 140,
            wind_speed_kt: 5,
            visibility_statute_mi: 4,
            wx_string: '-SHRA BR',
            sky_condition: [
              {
                sky_cover: 'SCT',
                cloud_base_ft_agl: 900
              },
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 1500
              }
            ]
          },
          {
            fcst_time_from: '2019-06-25T15:00:00Z',
            fcst_time_to: '2019-06-25T18:00:00Z',
            change_indicator: 'FM',
            wind_dir_degrees: 170,
            wind_speed_kt: 8,
            visibility_statute_mi: 6,
            wx_string: '-SHRA',
            sky_condition: [
              {
                sky_cover: 'BKN',
                cloud_base_ft_agl: 1000
              },
              {
                sky_cover: 'OVC',
                cloud_base_ft_agl: 4000
              }
            ]
          }
        ]
      }
    ],
  METARS: 
    [ 
      { raw_text: 'KMCO 241553Z VRB05KT 10SM SCT250 33/19 A3005 RMK AO2 SLP175 T03280194',
        station_id: 'KMCO',
        observation_time: '2019-06-24T15:53:00Z',
        latitude: 28.42,
        longitude: -81.33,
        temp_c: 32.8,
        dewpoint_c: 19.4,
        wind_dir_degrees: 0,
        wind_speed_kt: 5,
        visibility_statute_mi: 10,
        altim_in_hg: 30.050198,
        sea_level_pressure_mb: 1017.5,
        quality_control_flags: { 
          auto_station: true 
        },
        sky_condition: { 
          sky_cover: 'SCT', 
          cloud_base_ft_agl: 25000 
        },
        flight_category: 'VFR',
        metar_type: 'METAR',
        elevation_m: 29 
      },
      { 
        raw_text: 'KEWR 241551Z 25005KT 10SM FEW065 FEW180 BKN250 29/12 A2988 RMK AO2 SLP116 T02940117',
        station_id: 'KEWR',
        observation_time: '2019-06-24T15:51:00Z',
        latitude: 40.68,
        longitude: -74.17,
        temp_c: 29.4,
        dewpoint_c: 11.7,
        wind_dir_degrees: 250,
        wind_speed_kt: 5,
        visibility_statute_mi: 10,
        altim_in_hg: 29.878937,
        sea_level_pressure_mb: 1011.6,
        quality_control_flags: { 
          auto_station: true
        },
        sky_condition: [ 
          {
            sky_cover: 'FEW',
            cloud_base_ft_agl: 6000
          },
          {
            sky_cover: 'SCT',
            cloud_base_ft_agl: 25000
          }
        ],
        flight_category: 'VFR',
        metar_type: 'METAR',
        elevation_m: 7 
      } 
    ]
}
```

## License
Code released under the [MIT license](https://github.com/troussos/noaa-metar/blob/master/LICENSE)
