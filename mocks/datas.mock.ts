import Contact from "src/shared/types/Contact";
import Call from "src/shared/types/Call";
import Message from "src/shared/types/Message";
import Meeting from "src/shared/types/Meeting";

import tolkienImg from "./assets/tolkien.jpeg";
import orwellImg from './assets/orwell.jpg';
import mansonImg from './assets/manson.png';
import franklImg from './assets/frankl.png';
import hafezImg from './assets/hafez.jpg';
import russellImg from './assets/russell.jpeg';
import baleImg from './assets/bale.jpeg';
import nolanImg from './assets/nolan.jpeg';

const contacts: Contact[] = [
  {
    num: 989459004356,
    firstname: 'John R. R.',
    lastname: 'Tolkien',
    photo: tolkienImg,
    title: 'Poet'
  },
  {
    num: 989421071359,
    firstname: 'George',
    lastname: 'Orwell',
    photo: orwellImg,
    title: 'Writer'
  },
  {
    num: 989189071349,
    firstname: 'Mark',
    lastname: 'Manson',
    photo: mansonImg,
    title: 'Blogger'
  },
  {
    num: 989189071359,
    firstname: 'Viktor',
    lastname: 'Frankl',
    photo: franklImg,
    title: 'Philosopher'
  },
  {
    num: 989214207350,
    firstname: 'Hafez',
    lastname: 'Shirazi',
    photo: hafezImg,
    title: 'Poet'
  },
  {
    num: 989128657415,
    firstname: 'Bertrand',
    lastname: 'Russell',
    photo: russellImg,
    title: 'Logician'
  },
  {
    num: 989119664589,
    firstname: 'Chris',
    lastname: 'Bale',
    photo: baleImg,
    title: 'Actor'
  },
  {
    num: 989369664500,
    firstname: 'Chris',
    lastname: 'Nolan',
    photo: nolanImg,
    title: 'Director'
  },
]

const calls: Call[] = [
  {
    id: 1,
    num: 989119664589,
    type: 0,
    date: new Date(),
  },
  {
    id: 2,
    num: 989189071359,
    type: 0,
    date: new Date(),
  },
  {
    id: 3,
    num: 989459004356,
    type: 1,
    date: new Date(),
  },
  {
    id: 4,
    num: 989421071359,
    type: 2,
    date: new Date(),
  },
]

const messages: Message[] = [
  {
    id: 1,
    num: 989189071359,
    text: 'The desire for more positive experience is itself a negative experience.',
    date: new Date()
  },
  {
    id: 2,
    num: 989214207350,
    text: 'Fear is the cheapest room in the house.',
    date: new Date()
  },
  {
    id: 3,
    num: 989459004356,
    text: 'Not all those who wander are lost.',
    date: new Date()
  },
  {
    id: 4,
    num: 989128657415,
    text: 'Do not fear to be eccentric in opinion, for every opinion now accepted was once eccentric.',
    date: new Date()
  },
]

const meetings: Meeting[] = [
  {
    id: 1,
    caption: 'Quit Indian Imperial Police',
    from: new Date(),
    to: new Date()
  },
  {
    id: 2,
    caption: 'Getting Involved in TDK Trilogy',
    from: new Date(),
    to: new Date()
  },
  {
    id: 1,
    caption: 'Start Shooting the Inception',
    from: new Date(),
    to: new Date()
  },
  {
    id: 1,
    caption: 'Read LOTR Book at Cafe Santa Fe',
    from: new Date(),
    to: new Date()
  }
]

export { contacts, messages, calls, meetings };
