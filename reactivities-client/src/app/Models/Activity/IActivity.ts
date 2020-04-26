import { IAttendee } from "./../Attendee/IAttendee";
import { IComment } from "../Comment/IComment";

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  isHosting: boolean;
  isGoing: boolean;
  attendees: IAttendee[];
  comments: IComment[];
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";

  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }

    Object.assign(this, init);
  }
}
