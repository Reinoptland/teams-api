# Goal

- Fullstack app
- With auth
  - login / signup
  - endpoints that require a user to be authenticated
- And relations (Team hasMany Player)

# BACKEND: Testing with httpie

GET:

http :4000/movies

Outcomes:

It went well

- 200 OK + data in the body

It went somewhat well

**200 OK, but no data**

DEBUG:

- Check DB do we have data
- Are you using the Model to get data?
- Response is being return before the data from database is retrieved

- But - at least we have a route, and we are return a response

## Something went wrong

**500 Internal server error**

We know:

- Server is running
- The route we are making a request to exists

We don't know:

- What caused the error?

Debug: READ ERROR

- Which file
- What line
- What kind of error did we get

**404 not found**

Example:

```
<pre>Cannot GET /cheeses</pre>
```

We know:

- Server running

What is probably not working

- You don't have route that matches your request

Causes

- Typo in route (/team or /teams ?? :') )
- Parameters missing like ROUTE: /movies/:id REQUEST /movies/ <-- no id
- Router not imported and in index.js
- Route doesn't exist at all

Debug -> 1 by 1 check the causes

**401 not authorized**

We know:

- Server is running
- There is a route that matches
- The auth middleware is used for this route

What we don't know:

Why are we not authorized?

- Not logged
- Token is not valid
- No token was sent along with the request

# FRONTEND: REDUX devtools, REACT devtools, console.log, (chrome debugger?)

**Redux devtools not working**

- Store not setup correctly
- Not passed to provider
- Redux devtools extension not installed in store

**No initial state** (should not be a problem with multiple reducers)

- Maybe you state was an empty array? (Empty array doesn't show up ...)

**State in redux, but not rendered**

- Component not connected at all

1. does it have connect at the bottom
1. Are exporting the connected component as a default?
1. Are you importing it correctly (importing the default)

- MapStateToProps is incorrect

1. Check function

```javascript
const mapStateToProps = state => {
  console.log(state); // check what the state is
  return {
    // check react devtools, if the component has props.teams
    teams: state.teams
  };
};
```

2. Did you put mapStateToProps into connect??

- Check the render of the component -> Debug render (like below)

```javascript
  render() {
    console.log(this.props)
    return (
      <div>
        {/* <TeamsList teams={this.props.teams} />
        <CreateTeamFormContainer /> */}
      </div>
    );
  }
```

**Async action debugging**

1. Doing something before data arrives -> dispatching action before we get a response

- Make sure you dispatch inside a then block, after you have the data

1. Something other in your asyn action is not correct see debug strat below:

```javascript
export const loadTeams = () => (dispatch, getState) => {
  // 1. Request is not made

  // how to debug:
  // - console.log(getState()) to see what getState() returns
  // check the logic to see if it's correct
  // - console.log(getState().teams.length !== 0) // does this check pass?

  // guard statement that checks if we already have teams
  if (getState().teams.length !== 0) return;

  // - put a console.log below you guard statement to see if it passes
  // console.log('Guard statement passed??')

  // 2. Check if request is made succesfully
  request(`${baseUrl}/teams`) // url correct? -> make request with httpie first
    .then(response => {
      // console.log(response) -> have a look at the body of the request or status code
      // dispatch an EVENTS_FETCHED action that contains the events
      dispatch(teamsFetched(response.body)); // 3. check redux devtools if action got dispatched
    })
    .catch(console.error); // if you don't console response, check the console for errors
};
```

**Action dispatched, state not updated**

1. Reducer logic incorrect

- How to debug:

```javascript
import { TEAMS_FETCHED, TEAM_CREATE_SUCCESS } from "../actions/teams";

export default (state = [], action = {}) => {
  // what is mys state when action is dispatched, what is my action
  // console.log("STATE", state, "ACTION", action);
  switch (action.type) {
    case TEAMS_FETCHED:
      // experiment with transformation here:
      console.log("NEW STATE", [...state, ...action.payload]); // try your transformation here
      return [...state, { ...action.payload }];

    case TEAM_CREATE_SUCCESS:
      return [...state, { ...action.payload }];

    default:
      return state;
  }
};
```

**Database is updated after the request, but we need to refresh to see it**

- Cause: frontend state (redux) & backend state (db) are out of sync
- Common cause: redux is not updated after request

You might need to:

- dispatch an action
- handle the action in the reducer(s)
