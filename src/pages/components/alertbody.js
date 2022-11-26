import { format } from "date-fns";

export default function AlertBody ({ alertDate, alertText }) {
  return (
    <div className="alertBody">
        <p className="alertDate">Effective as of {format(new Date(alertDate), 'MM-dd-yyyy HH:mm')}</p>
        <p className="alertText">{alertText}</p>
    </div>
  )
}