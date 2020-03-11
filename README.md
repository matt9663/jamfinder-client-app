# JamFinder React App

## [Live Link](https://jamfinder-app.now.sh/)

This repo contains all the files for the client of my JamFinder site, built using React. This site was designed to provide a platform for musicians to create bands and find people near them to jam with. The app is built on top of a PostgreSQL database, which is connected with the client via a Node/Express server. [Server repo](https://github.com/matt9663/jamfinder-server-api). Login is required to use most features of the site. Security is handled with password encryption by the Bcryptjs library and JWT auth tokens.

The current version supports several features, such as creating a band, joining existing bands that are open to new members, and posting to the band message board when the user is a member of the group. 

### Dashboard

![dashboard](https://user-images.githubusercontent.com/51541006/76432064-59c69c80-63aa-11ea-9905-c2b252243a72.png) 

The user Dashboard is the main hub of the site for current users. It lists all the bands they are currently members of, as well as the links to editing their personal profile and creating a new band. They can access each of their band's profile pages by clicking on the name in the list.

### Create Band Page 

![CreateBand](https://user-images.githubusercontent.com/51541006/76432058-57644280-63aa-11ea-87fd-5d8f7b782ca8.png)

This is where users can create new bands. They can choose a name, genre, location, and a bio, as well as specifiying whether or not they are open for new members to join.

### Band Bio

![BandBio](https://user-images.githubusercontent.com/51541006/76432037-5206f800-63aa-11ea-8fd4-ba40b54f8ac1.png)

This page is where users can see information about bands on the site. Non-members will be able to see the Bio  and current roster, as well as join the band if it is currently open. Once they are a memeber, the user will be able to see and post messages to the band's message board. The bandleader will also see the Edit Band button, where they can make changes to the band's information and update its open status.

### Bands List 

![BandsList](https://user-images.githubusercontent.com/51541006/76432049-5501e880-63aa-11ea-9efa-d58e59bd8efd.png)

This page is where users can search for bands to join and see who all is on the site. Bands can be filtered by name, genre, or location. 