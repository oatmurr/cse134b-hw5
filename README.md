# cse134b-hw5

i added a new page to the site for artifacts. (in the css part of the assignment, i only had the characters page). the reason i decided to do this was because each individual artifact contains less data than each individual character, so i can display everything as cards on the page instead of having links that redirect to a new page. (this was negated by the link requirement for the card, but i ended up directing that link to an empty page anyway because i didn't see anything in the documentation about needing to implement those pages -- only the links themselves). i reused many aspects of my character card implementation from the css assignment, including even embedding a smaller card into the larger card. i also referenced my css work where i could.

there was an issue with how i'm handling localStorage. despite changing my localStorage, since it's stored in the browser, it doesn't update. so i added an extra button to manually clear localStorage.
