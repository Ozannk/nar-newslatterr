import { Mails } from "./mails";

export class MailGroup {
  id: number | undefined;
  name: string | undefined;
  tag: string | undefined;
  mailList: Mails[] | any;
}
