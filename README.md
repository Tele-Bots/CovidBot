<p align="center"><img src="https://image.flaticon.com/icons/svg/2785/2785741.svg" align="center" width="175"></p>
<h1 align="center">Covid19Bot</h1>
<h5 align="center">Feature-rich bot to get live Covid-19 stats.</h5>

<p align="center"><img src="https://user-images.githubusercontent.com/30543444/81776822-2cfb4680-950d-11ea-9510-e5878627e18f.png" align="center" width="400"></p>
  
| Command                 | Description                                                 | Status             | Example        |
| ----------------------- |:-----------------------------------------------------------:|:------------------:|  -------------:|
| StateName/StateCode     | Gives stats of state data/ District-wise sorted analysis    | :heavy_check_mark: | `Punjab`,`pb`  |
| all                     | Gives all india stats/ Top 15 states with most cases        | :heavy_check_mark: | `all`          |
| daily                   | Gives all india daily changes analysis for past 5 days      | :heavy_check_mark: | `daily`        |
| daily N                 | Gives all india daily changes analysis for past `N` days    | :heavy_check_mark: | `daily 15`     |
| test State              | Gives all the test centers for Corona in the given state    | :heavy_check_mark: | `test punjab`  |
| new                     | Gives all the states with sorted new cases                  |   `Coming soon`    | `new`          |
| new State               | Gives all the districts with sorted new cases               |   `Coming soon`    | `new punjab`   |

### Features:
- [x] No hectic menus. Just send the command and get the stats instantly.
- [x] District-wise stats are also sorted to show critical areas first.
- [x] Case insensitive. `Pb`, `pb`, `pB`, `PuNJAb` all means Punjab.
- [x] Indicate in brackets how many cases are new.
- [x] Supports State Codes. Send `JK` instead of Jammu and Kashmir.
