<p align="center"><img src="https://image.flaticon.com/icons/svg/2785/2785741.svg" align="center" width="175"></p>
<h1 align="center">Covid19Bot</h1>
<h5 align="center">Feature-rich bot to get live Covid-19 stats.</h5>

<p align="center"><img src="https://user-images.githubusercontent.com/30543444/81913483-a9655680-95ed-11ea-9b32-b89598fc9f88.png" align="center" width="400"></p>
<p align="center">
    <img width="400" src="https://user-images.githubusercontent.com/43115551/94915637-dcd84d00-04ca-11eb-9474-9a74919b77b9.jpg" align="center" alt="CovidBot ScreenShots">
</p>
<p align="center">
    <img width="400" src="https://user-images.githubusercontent.com/43115551/94915634-dba72000-04ca-11eb-8d3a-920fc442b4f6.jpg" align="center" alt="CovidBot ScreenShots">
</p>
  
| Command             |                        Description                        |       Status       |       Example       |
| ------------------- | :-------------------------------------------------------: | :----------------: | ------------------: |
| StateName/StateCode |         State data/ District-wise sorted analysis         | :heavy_check_mark: |       `Punjab`,`pb` |
| all                 |      All India stats/ Top 15 states with most cases       | :heavy_check_mark: |               `all` |
| daily               |      Daily confirmed cases analysis for past 10 days      | :heavy_check_mark: |             `daily` |
| g daily             | Daily graphical confirmed cases analysis for past 10 days | :heavy_check_mark: |           `g daily` |
| daily N             |         Daily changes analysis for past `N` days          | :heavy_check_mark: |          `daily 15` |
| g daily N           |       Daily graphical analysis for past `N` days          | :heavy_check_mark: |        `g daily 15` |
| daily active        |       Daily active cases analysis for past 10 days        | :heavy_check_mark: |      `daily active` |
| g daily active      |   Daily active cases graphical analysis for past 10 days  | :heavy_check_mark: |    `g daily active` |
| daily active N      |       Daily active cases analysis for past `N` days       | :heavy_check_mark: |   `daily active 15` |
| g daily active N    |   Daily active cases graphical analysis for past `N` days | :heavy_check_mark: | `g daily active 15` |
| daily rec           |      Daily recovered cases analysis for past 10 days      | :heavy_check_mark: |         `daily rec` |
| g daily rec         | Daily recovered cases graphical analysis for past 10 days | :heavy_check_mark: |       `g daily rec` |
| daily rec N         |      Daily recovered cases analysis for past `N` days     | :heavy_check_mark: |      `daily rec 15` |
| g daily rec N       | Daily recovered cases graphical analysis for past `N` days| :heavy_check_mark: |    `g daily rec 15` |
| daily dec           |      Daily deceased cases analysis for past 10 days       | :heavy_check_mark: |         `daily dec` |
| g daily dec         |  Daily deceased cases graphical analysis for past 10 days | :heavy_check_mark: |       `g daily dec` |
| daily dec N         |      Daily deceased cases analysis for past `N` days      | :heavy_check_mark: |      `daily dec 15` |
| g daily dec N       | Daily deceased cases graphical analysis for past `N` days | :heavy_check_mark: |    `g daily dec 15` |
| graph               |       Daily cases graphical summary for past 10 days      | :heavy_check_mark: |             `graph` |
| graph N             |       Daily cases graphical summary for past `N` days     | :heavy_check_mark: |          `graph 15` |
| test State          |        Test centers for Corona in the given state         | :heavy_check_mark: |       `test punjab` |
| new                 |           All the states with sorted new cases            | :heavy_check_mark: |               `new` |
| new State           |          All the districts with sorted new cases          | :heavy_check_mark: |        `new punjab` |

### Features:
- [x] No hectic menus. Just send the command and get the stats instantly.
- [x] District-wise stats are also sorted to show critical areas first.
- [x] Case insensitive. `Pb`, `pb`, `pB`, `PuNJAb` all means Punjab.
- [x] Indicate in brackets how many cases are new.
- [x] Supports State Codes. Send `JK` instead of Jammu and Kashmir.
- [x] Graphs support for better visualization (by [@baljinderxd](https://github.com/baljinderxd))
