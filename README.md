#Outlook Lookout
*Fragile Attempt at coercing outlook.office365.com to push desktop notifications*
🚧 Work in Progress

## ...Why?
On Macintosh computers, Microsoft Outlook's desktop application is an untamable beast of a thing. It spontaneously decides to devour system resources, it keeps restarting itself in weird new ways, and the majority of the people around me don't seem to notice or care. Microsoft Outlook for Mac is basically the gremlin from that episode of The Twilight Zone.

Conversely, the Outlook web app (not OWA) is reasonably delightful if you're already roped into the 365 ecosystem. The biggest drawback, however, is that it just doesn't want to send desktop notifications. Maybe we can change that! Let's be William Shatner popping the emergency exit hatch and lunging from the fuselage with a handgun to *kill that gremlin.*

## Usage
The plan is to make this into a browser extension that can also be injected into a [nativefier](https://github.com/jiahaog/nativefier) electron app for @ajlende, but in this early stage, I'm just copying `main.js` into the browser console like a weirdo.
1. Copy contents of `main.js` into the browser console.
1. Wait for a reminder notification to come up in Outlook
  * Alternatively, you can take some initiative and make a fake appointment 1 minute from now.
1. Behold. Some strings that will eventually make their way into the notification are printed to the console before your very eyes.
  * Unless something broke. That's really possible.

##Changelog
* **2018-10-16** *Blazing the trail*
  * Pulls attributes of a reminder notification and prints them to the console.
