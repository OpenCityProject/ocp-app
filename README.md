Open City Project Mobile App
============================

This is an app for Android and iOS.

The chosen architecture is React Native

TODO 2017-01-12
---------------
* react-native-fcm
* microsoft-code-push
* react-native-maps
* react-native-vector-icons
* realm
* redux

* lodash
* moment

Requirements Spec 2016-11-25
----------------------------
### From outline
* Functioning for IOS and Android
* GPS to view stuff near me
* Report/review data
* Report bugs with app

### Meeting thoughts
* GPS to view stuff near me
    * Map - landmarks or listview
* Report/review data
    * Table v card
* Report bugs with app
    * Simple form

### Clearer outline on this day
* Login flow (optional, but should be there) (signup? probably not?)
* Main view - Map - Christchurch / Where you are right now (makes more sense)
    * Landmarks + events (icon?), display times for events, some smarts for congested areas if there's time (only show one if several if too close to display)
    * Also add a listview with sorting from nearest to furthest (maybe with filtering...)
* If logged in as admin, then they can view unmoderated landmarks and approve / discard them
* Probably have a login / review button on the top right + settings
* Reporting bugs
    * Single big description field
    * Submit goes to database - could use zendesk for better management

> If you make a good website, you don't need to make an app?
