import { IAttendee } from "./../Attendee/IAttendee";
import { IComment } from "../Comment/IComment";

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
  isHosting: boolean;
  isGoing: boolean;
  attendees: IAttendee[];
  comments: IComment[];
}
