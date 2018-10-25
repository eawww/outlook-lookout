const NOTIF_PARENT_CLASS = 'o365cs-notifications-notificationPopupArea';

const getFirstElementWithClass = (className, parentElement) => {
  const elements = parentElement.getElementsByClassName(className);
  return elements[0] || null; // maybe return generic node?
}

// REMINDERS //
const REMINDER_CLASS = 'o365cs-notifications-reminders-flexpaneitem';

const reminderClassNames = {
  title: 'o365cs-notifications-reminders-title',
  timeToStartValue: 'o365cs-notifications-toastReminders-timeToStartValue',
  timeToStartUnit: 'o365cs-notifications-reminders-timeToStartUnit',
  // 9:45a - 10:45a
  timeDuration: 'o365cs-notifications-reminders-timeDuration',
  location: 'o365cs-notifications-reminders-location',
  overdue: 'o365cs-notifications-toastReminders-overdue',
}

// Takes DOM element assumed to be a an ancestor of all the necessary nodes
const parseReminder = (reminder) => {
  const reminderProperties = {
    title: getFirstElementWithClass(reminderClassNames.title, reminder).innerText || '',
    timeToStartValue: getFirstElementWithClass(reminderClassNames.timeToStartValue, reminder).innerText || '',
    timeToStartUnit: getFirstElementWithClass(reminderClassNames.timeToStartUnit, reminder).innerText || '',
    timeDuration: getFirstElementWithClass(reminderClassNames.timeDuration, reminder).innerText || '',
    location: getFirstElementWithClass(reminderClassNames.location, reminder).innerText || '',
    overdue: getFirstElementWithClass(reminderClassNames.overdue, reminder).innerText || '',
  }
  // log it for now
  console.log('Appointment Parsed:');
  console.log(reminderProperties);
}

// NEW MAIL? //
const NEW_MAIL_CLASS = `o365cs-notifications-newMailPopupButtonContent`

const newMailSelectors = {
  image: `img.o365cs-notifications-newMailPersonaImage`, // src
  initials: `div.o365cs-notifications-newMailPersonaImage`, //innerText
  from: `span.o365cs-notifications-text.o365cs-segoeRegular`, //innerText
  subject: `span.o365cs-notifications-text.o365cs-segoeSemiBold.ms-fcl-tp`, //innerText
  preview: `span.o365cs-notifications-text.o365cs-notifications-bodypreviewtext`, //innerText
}

const parseNewMail = (newmail) {
  const newMailProperties = {
    image: newMail.querySelector(newMailSelectors.image).src || '',
    initials: newMail.querySelector(newMailSelectors.initials).innerText || '',
    from: newMail.querySelector(newMailSelectors.from).innerText || '',
    subject: newMail.querySelector(newMailSelectors.subject).innerText || '',
    preview: newMail.querySelector(newMailSelectors.preview).innerText || '',
  }
  console.log('New Mail Parsed!')
  console.log(newMailProperties);
}


// GENERAL MUTATION OBSERVIN'
// I watched you chaaaaaaaaange...
const parseMutationRecord = (mutation) => {
  Array.from(mutation.addedNodes).map(addedNode => {
    if (addedNode.classList.contains(REMINDER_CLASS)){
      parseReminder(addedNode);
    } else if (addedNode.querySelector(NEW_MAIL_CLASS)) {
      parseNewMail(addedNode);
    }
    // add more stuff as we support more notification types
  })
}

// Gets reference to closest parent of notification that exists when the page loads
const notificationElems = document.getElementsByClassName(NOTIF_PARENT_CLASS);
const notificationElem = notificationElems[0] || Error.log('No notification parent element found');

/*
In the mutation observer, our callback is passed a list of mutations.
In this case, we're interested in those of type 'childList' anywhere on
the subtree of our element.
*/
const observerConfig = { attributes: false, childList: true, subtree: true };

const observerCallback = (mutationList, observer) => {
  console.log('OBSERVER CALLBACK');
  console.log(mutationList);
  // filter down to just what we want and parse 'em
  const justTheObserverRecordsWeWant = mutationList.filter(
    record => record.type == 'childList' &&
      record.addedNodes.length > 0
  ).forEach(record => parseMutationRecord(record));
}

// MutationObserver is a neat thing added in ES2015
const observer = new MutationObserver(observerCallback);
observer.observe(notificationElem, observerConfig);
