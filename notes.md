# Current Issues
1. Database Model
2. Storing data efficiently
4. Analyzing the data
3. Potential ways to increase speed on fetching data.

## Databse Model
> Overview
So one challenge we have here is how to model our databse to support fast query times. To overcome this we need to first consider what data is crucial to the models, and what can be helpful.
> Summoner Information
Summoner information is the general data for there account. Wins/Losses/Lp/Rank/SummonerName + Icon etc...
- summoner_name <String>
- account_id <String>
- puuid <String>
- profile_icon_id <Integer>
- league_id <String>
- tier <String>
- rank <String>
- league_points <Integer>
- wins <Integer>
- losses <Integer>
- summoner_id <String>
- summoner_level <String>
> LP History
This is information that we need to store historically to show a graph/chart of there lp over time
- lp_history <Object>:<Object>
exmaple:
```javascript
    lp_history = {
        date: { tier: <String>, division: <String>, lp: <String> }
    }
```
> Match History
This is one of the more tricky ones, match data is very nested so we need to store it in a way that allows for quick operations
- match_history <Object>:<Object>:<Object>
exmaple:
```javascript
    match_history = {
        chunk1: {
            game1: { date: <Date>, gameInfo: <Object> }
            ... game20
        },
        chunk2: {
            game1: { date: <Date>, gameInfo: <Object> }
            ... game20
        },
        ...
    }
```

## Storing data
> This application is data heavy, and needs to have constant updates as the API is updated very often, to solve this we can try to implement these ideas
- Do an initial fetch upon sign up of a new account if they enter a summoner_name
- Do an update whenever a user is searched, and if they dont exist in the DB then add them to the DB
- Have an update button on a users profile, and upon clicking update it will force refresh all the new matches/info and store it properly
- Have a script that runs atleast once a day to update every user in the DB (Would be cool to do every user, but currently dont have the resources for that)


