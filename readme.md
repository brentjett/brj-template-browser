# Template Browser for Beaver Builder (Experimental)

The goal of this project is to create a more flexible interface for interacting with saved layouts in Beaver Builder. The alternate "Templates" panel allows you to browse and view each of the included and saved templates, view their metadata, and organize them into new custom collections.

## Shareable Templates
One of the goals of this project is to make layouts more sharable between multiple sites and different beaver builder users across the web. You can download a single template to a file by clicking the download template button or dragging the thumbnail off to the filesystem. You can then drag a file onto the panel to import that layout into a different site (coming soon).

The other method of sharing templates is called Libraries. The panel allows you to access a main library of featured templates as well as add other libraries. Essentially any site using beaver builder can choose to have it's saved templates available publicly to be consumed by other interested beaver builder users. New libraries only need to have the site's url entered and they'll fetch the available templates.

## Template Collections
Template collections let you organize your saved templates into groups. Collections that are public would be included in the "Store" feed when someone adds your site as a library.

## Libraries
The concept of a library is based on the idea of templates and collections being intentionally set to "public". A library calls the site's URL that you input, and displays a "store" view of that site's public templates and collections. Dragging a template from a library into "Saved Templates" or any custom collection should import that template into the current site as a new saved template. Once a template is copied to the new site it can be modified independently.

## Functionality still to come
* Libraries can be created but do not fetch their contents yet.
* Collections can be created and renamed but are not currently saving their member templates.
* Drag-to-import is not currently implemented.
