How to run the app locally:

- install dependencies by running `npm install`
- opan an iOS or android emulator then run `npm run ios` or `npm run android`

Thoughts when building the app:

- folder structure is divided on 4 parts.
  - `features` folder contains all the features of the application and all functions related to the feature is
    located here.
  - `screens` folder contains all the screens in the app. Each screen has its own folder so that if the logic
    gets too big, I can just create a `.logic.tsx` file for the screen to abstract the logic from the UI.
  - `shared` folder contains all the shared features of the application (e.g. components, utils, styles, types, etc...)
  - `store` folder. Since there is no need for a state manager on the application, I have not created this folder. But this folder will contain all the files required for a state manager to function.
- was supposed to use scss but I was having a hard time configuring scss on the latest expo sdk so
  I just used the native stying (Stylesheet)
- used react query for the server response since it has built in caching and states for running server requests
- used `useInfiniteQuery` to load movie list since I initially thought the requirement is loading movies
  when scrolling but it still is useable when pressing a button to load more through the `fetchNextPage` property
  exposed by the `useInfiniteQuery`
- used `useQuery` to get the movie property by ID so that I wont have to create states for error and loading. Also,
  it automatically caches the data so its a plus.
- used react navigation for routing. And Im a typescript fan so typing the routes for react navigation is a breeze.
